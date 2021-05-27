import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {Subject, combineLatest} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-notification-container',
    templateUrl: './notification-container.component.html',
    styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit, OnDestroy {

    @Input() user: string;
    penkaRequest = [];
    myRequest$;
    otherUsersRequest$;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private penkaRequestService: PenkaRequestService) {
    }

    ngOnInit(): void {
        this.myRequest$ = this.penkaRequestService.getPenkaRequestByMaker(this.user);
        this.otherUsersRequest$ = this.penkaRequestService.getAcceptedAndRejectedRequests(this.user);

        combineLatest([this.myRequest$, this.otherUsersRequest$]).pipe(
            takeUntil(this.unsubscribe$),
            map((response: any) => [...response[0], ...response[1]])
          ).subscribe(
            response => {
                console.log(response);
                
              this.penkaRequest = response;
            }
          );
    }

    updateNotificationsStatus(request?): void {
        if(!request) {
            // when close mat menu
            let requestsToUpdate = this.penkaRequest.filter(req => req.status === '8' || req.status === '9');
            requestsToUpdate.forEach(req =>{ 
                req.timesShow = req.timesShow + 1
                this.penkaRequestService.updatePenkaRequest(req);
                const indexToDelete = this.penkaRequest.findIndex(r => r.id === req.id);
                this.penkaRequest.splice(indexToDelete)
            });

        } else {
            // from accept/reject event button
            const indexToDelete = this.penkaRequest.findIndex(p => p.id === request.id);
            this.penkaRequest.splice(indexToDelete);

        }
    }
    
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
