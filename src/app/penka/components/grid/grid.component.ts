import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {ParticipantsService} from '../../../core/services/participants.service';
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
    title = 'Matriz de Resultados';
    codePenka: string;
    listMatches = [];
    singleMatches = [];
    participants = [];
    gambles = [];
    user = {} as User;

    private unsubscribe$ = new Subject<void>();
    today = new Date();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private singleMatchesService: SingleMatchesService,
        private participantService: ParticipantsService,
        private gamblesService: GambleService) {
        this.user = this.firebase.auth().currentUser;
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        this.participantService.getParticipantByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;
            });
        this.gamblesService.getGambleByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.gambles = res;
            });
        this.singleMatchesService.getMatchesPublicAndFinish()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatches = res;
            }
        );
    }

    getClass(score): string {
        let classRet = 'score-achieved';
        if(score === 5) {
            classRet = 'score-5';
        } else if (score === 3) {
            classRet = 'score-3'
        } 
        return classRet;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
