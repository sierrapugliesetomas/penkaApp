import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {Template} from '../../../core/interfaces/template';
import {TemplatesService} from '../../../core/services/templates.service';
import {takeUntil} from 'rxjs/operators';
import {ParticipantsService} from '../../../core/services/participants.service';
import {Participant} from '../../../core/interfaces/participant';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

    /* Array single matches */
    singleMatches = [] as SingleMatch[];
    /* Array templates */
    templates = [] as Template[];
    /* Array participation */
    participants = [] as Participant[];
    /* User Object */
    user = {} as User;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private singleMatchesService: SingleMatchesService,
        private templateService: TemplatesService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {

        /* user data */
        this.user = this.firebase.auth().currentUser;

        /**************/
        /* Get Single Matches public */
        this.singleMatchesService.getSingleMatchesPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatches = res;
            });
        /*************************/
        /* Get Templates */
        this.templateService.getTemplatesPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.templates = res;
            });
        /*************************/
        /* Get Participation */
        this.participantsService.getParticipantsPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;
            });
        /*************************/
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
