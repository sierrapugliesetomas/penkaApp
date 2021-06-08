import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {Subject, combineLatest} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { Router } from '@angular/router';
import { PenkaRequest } from 'src/app/core/interfaces/penkaRequest';

@Component({
    selector: 'app-notification-container',
    templateUrl: './notification-container.component.html',
    styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit, OnDestroy {

    @Input() user: string;
    penkaRequest = [];
    unseenNotifications: number;
    myRequest$;
    otherUsersRequest$;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private penkaRequestService: PenkaRequestService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.myRequest$ = this.penkaRequestService.getPenkaRequestByMaker(this.user);
        this.otherUsersRequest$ = this.penkaRequestService.getOtherNotificationsRequests(this.user);

        combineLatest([this.myRequest$, this.otherUsersRequest$]).pipe(
            takeUntil(this.unsubscribe$),
            map((response: any) => [...response[0], ...response[1]])
          ).subscribe(
            response => {
              this.penkaRequest = response;
              this.unseenNotifications = this.penkaRequest.filter(req => req.timesShow === 0).length;
            }
          );
    }

    updateNotificationsStatus(request?): void {
        this.unseenNotifications = 0;
        if(!request) {
            // when close mat menu
            let requestsToUpdate = this.penkaRequest.filter(req => req.status !== '1');
            requestsToUpdate.forEach(req =>{ 
                req.timesShow = req.timesShow + 1
                this.penkaRequestService.updatePenkaRequest(req);
            });

        } else {
            // from accept/reject event button
            const indexToDelete = this.penkaRequest.findIndex(p => p.id === request.id);
            this.penkaRequest.splice(indexToDelete);

        }
    }

    goGamble(request: PenkaRequest): void {
        this.router.navigate(['/penka/gamble/' + request.codePenka]).catch();
    }
    
    goGrid(request: PenkaRequest): void {
        this.router.navigate(['/penka/grid/' + request.codePenka]).catch();
    }

    goDashboard(request: PenkaRequest): void {
        this.router.navigate(['/penka/dashboard/' + request.codePenka]).catch();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
