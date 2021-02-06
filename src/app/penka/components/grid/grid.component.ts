import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {Participant} from '../../../core/interfaces/participant';
import {Gamble} from '../../../core/interfaces/gamble';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';
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
    listMatches = [] as ListMatches[];
    singleMatches = [] as SingleMatch[];
    participants = [] as Participant[];

    /* Array Gamble */
    gambles = [] as Gamble[];

    /* User Object */
    user = {} as User;

    private unsubscribe$ = new Subject<void>();
    today = new Date();
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    date: string;
    time: string;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private singleMatchesService: SingleMatchesService,
        private listMatchesService: ListMatchesService,
        private participantService: ParticipantsService,
        private gamblesService: GambleService) {

        if (this.today.getDate() < 10) {
            this.day = '0' + this.today.getDate();
        } else {
            this.day = '' + this.today.getDate();
        }
        if ((this.today.getMonth() + 1) < 10) {
            this.month = '0' + (this.today.getMonth() + 1);
        } else {
            this.month = '' + (this.today.getMonth() + 1);
        }
        this.year = '' + this.today.getFullYear();
        if (this.today.getHours() < 10) {
            this.hour = '0' + this.today.getHours();
        } else {
            this.hour = '' + this.today.getHours();
        }
        if (this.today.getMinutes() < 10) {
            this.minute = '0' + this.today.getMinutes();
        } else {
            this.minute = '' + this.today.getMinutes();
        }

        this.date = this.month + '-' + this.day + '-' + this.year;
        this.time = this.hour + ':' + this.minute;
    }

    ngOnInit(): void {
        /* user data */
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        /* Get Single Matches */
        this.singleMatchesService.getSingleMatches()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatches = res;
            });
        /*************************/
        /* Get Participants */
        this.participantService.getParticipantByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;
            });
        /***************/
        /* Get Gambles */
        this.gamblesService.getGambleByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.gambles = res;
            });
    }


    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
