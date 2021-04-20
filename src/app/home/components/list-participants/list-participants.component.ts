import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {Participant} from '../../../core/interfaces/participant';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
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
    @Output() selectedUserEvent = new EventEmitter<string>();

    /* Array Gamble Accumulated Score */
    gambles = [] as Gamble[];
    listParticipants = [];
    participants = [] as Participant[];
    user = {} as User;
    counter = 1;
    singleParticipant = [];
    selectedUserId: string;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private participantsService: ParticipantsService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.participantsService.getParticipantByCodePenkaLimit4(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.listParticipants = res;
            });
        this.participantsService.getParticipantByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    selectUser(userId): void {
        this.selectedUserEvent.emit(userId);
        this.selectedUserId = userId;
    }

}
