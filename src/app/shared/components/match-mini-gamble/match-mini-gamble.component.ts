import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SingleMatch} from '../../../core/interfaces/single-match';

@Component({
    selector: 'app-match-mini-gamble',
    templateUrl: './match-mini-gamble.component.html',
    styleUrls: ['./match-mini-gamble.component.scss']
})
export class MatchMiniGambleComponent implements OnInit, OnDestroy {

    @Input() match;
    singleMatch = {} as SingleMatch;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private singleMatchesService: SingleMatchesService) {
    }


    ngOnInit(): void {
        /* Get Single Matches public */
        this.singleMatchesService.getSingleMatchById(this.match.singleMatchId)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatch = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
