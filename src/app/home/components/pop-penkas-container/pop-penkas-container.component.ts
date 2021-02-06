import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Participant} from '../../../core/interfaces/participant';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ParticipantsService} from '../../../core/services/participants.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-pop-penkas-container',
    templateUrl: './pop-penkas-container.component.html',
    styleUrls: ['./pop-penkas-container.component.scss']
})
export class PopPenkasContainerComponent implements OnInit, OnDestroy {
    user = {} as User;
    myParticipants = [] as Participant[];
    participants = [] as Participant[];
    filterParticipants = [] as Participant[];
    finalFilter = [];
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
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

                // tslint:disable-next-line:prefer-for-of
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
