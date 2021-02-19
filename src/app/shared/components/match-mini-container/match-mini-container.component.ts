import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ListMatches} from '../../../core/interfaces/list-matches';

@Component({
    selector: 'app-match-mini-container',
    templateUrl: './match-mini-container.component.html',
    styleUrls: ['./match-mini-container.component.scss']
})
export class MatchMiniContainerComponent implements OnInit, OnDestroy {
    @Input() codeTemplate: string;
    @Input() codePenka: string;

    listMatches = [] as ListMatches[];
    private unsubscribe$ = new Subject<void>();

    constructor(
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        if (this.codeTemplate) {
            this.listMatchesService.getListMatchesByCodeTemplateLimit4(this.codeTemplate)
                .pipe(
                    takeUntil(this.unsubscribe$)
                ).subscribe(
                res => {
                    this.listMatches = res;
                });
        }
        if (this.codePenka) {
            this.listMatchesService.getListMatchesByCodePenkaLimit4(this.codePenka)
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
