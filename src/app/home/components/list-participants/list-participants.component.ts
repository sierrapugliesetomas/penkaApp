import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {Participant} from '../../../core/interfaces/participant';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ParticipantsService} from '../../../core/services/participants.service';
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-list-participants',
    templateUrl: './list-participants.component.html',
    styleUrls: ['./list-participants.component.scss']
})
export class ListParticipantsComponent implements OnInit, OnDestroy {


    @Input() codePenka;
    @Output() selectedUser = new EventEmitter<string>();

    /* Array Gamble Accumulated Score */
    gambles = [] as Gamble[];
    participants = [] as Participant[];
    user = {} as User;
    counter = 1;
    singleParticipant = [];

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        /* Get Participants by codePenka */
        this.participantsService.getParticipantByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;

                if (this.counter === 1) {

                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < this.participants.length; i++) {
                        let gambles = [];
                        let counter = 1;
                        let accumulatedScore = 0;
                        this.gambleService.getGambleByGetScore(this.participants[i].userId, this.codePenka).subscribe(
                            result => {
                                gambles = result;

                                // tslint:disable-next-line:prefer-for-of
                                for (let x = 0; x < gambles.length; x++) {
                                    accumulatedScore = accumulatedScore + gambles[x].scoreAchieved;
                                }
                                if (counter === 1) {
                                    this.participantsService.updateAccumulatedScore(this.participants[i].id, accumulatedScore);
                                    counter++;
                                }
                            }, error => console.log(error));
                    }
                }
                this.counter++;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    selectUser(userId): void {
        this.selectedUser.emit(userId);
    }

}
