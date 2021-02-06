import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-notification-container',
    templateUrl: './notification-container.component.html',
    styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit, OnDestroy {

    @Input() user: string;
    penkaRequest = [];
    private unsubscribe$ = new Subject<void>();

    constructor(
        private penkaRequestService: PenkaRequestService) {
    }

    ngOnInit(): void {
        this.penkaRequestService.getPenkaRequestByMaker(this.user)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penkaRequest = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
