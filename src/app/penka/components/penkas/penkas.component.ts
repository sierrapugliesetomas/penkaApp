import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {ParticipantsService} from '../../../core/services/participants.service';

@Component({
    selector: 'app-penkas',
    templateUrl: './penkas.component.html',
    styleUrls: ['./penkas.component.scss']
})
export class PenkasComponent implements OnInit, OnDestroy {
    title = 'Mis Penkas';
    status: string;
    user = {} as User;
    participants = [];
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.participantsService.getAllParticipantByUserId(this.user.uid)
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

    selectPenka(event): any {
        this.status = event.value;
    }
}
