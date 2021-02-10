import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-match-mini-counter',
    templateUrl: './match-mini-counter.component.html',
    styleUrls: ['./match-mini-counter.component.scss']
})
export class MatchMiniCounterComponent implements OnInit, OnDestroy {

    @Input() codeTemplate: string;
    @Input() codePenka: string;

    listMatches = [];
    private unsubscribe$ = new Subject<void>();

    constructor(
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        if (this.codeTemplate) {
            this.listMatchesService.getListMatchesByCodeTemplate(this.codeTemplate)
                .pipe(
                    takeUntil(this.unsubscribe$)
                ).subscribe(
                res => {
                    this.listMatches = res;
                });
        }
        if (this.codePenka) {
            this.listMatchesService.getListMatchesByCodePenka(this.codePenka)
                .pipe(
                    takeUntil(this.unsubscribe$)
                ).subscribe(
                res => {
                    this.listMatches = res;
                });
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
