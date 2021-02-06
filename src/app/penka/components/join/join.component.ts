import {Component, OnDestroy, OnInit} from '@angular/core';
import {PenkasService} from '../../../core/services/penkas.service';
import {Penka} from '../../../core/interfaces/penka';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ParticipantsService} from '../../../core/services/participants.service';
import {User} from '../../../core/interfaces/user';
import {Participant} from '../../../core/interfaces/participant';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit, OnDestroy {
    title = 'Participa de una PenKa';
    term: string;
    codePenka: string;
    penkaName: string;

    penkas = [] as Penka[];
    user = {} as User;
    myParticipants = [] as Participant[];
    participants = [] as Participant[];
    filterParticipants = [] as Participant[];

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService,
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        /* Get Penkas */
        this.penkasService.getPenkas()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penkas = res;
            });

        /* User */
        this.user = this.firebase.auth().currentUser;
        /* Get my Participation */
        this.participantsService.getParticipantByUserId(this.user.uid)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.myParticipants = res;
            });
        /* Get Participants */
        this.participantsService.getParticipantsPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;
                this.filterParticipants = this.participants.filter(item => {
                    return item.userId !== this.user.uid;
                });

                for (let i = 0; i < this.myParticipants.length; i++) {
                    this.filterParticipants = this.filterParticipants.filter(item => {
                        return item.codePenka !== this.myParticipants[i].codePenka;
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
