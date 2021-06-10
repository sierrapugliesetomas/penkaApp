import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { combineLatest, Subject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../core/services/auth.service';
import { ParticipantsService } from '../../../core/services/participants.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-penka-viewer',
    templateUrl: './penka-viewer.component.html',
    styleUrls: ['./penka-viewer.component.scss']
})
export class PenkaViewerComponent implements OnInit, OnDestroy {
    codePenkaSelected: string;
    myParticipations = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        const openParticipants = this.participantsService.getOpenParticipantByUserId(this.user.uid);
        const yesterdayFinishParticipants = this.participantsService.getYesterdayFinishParticipantsByUserId(this.user.uid);

        combineLatest([openParticipants, yesterdayFinishParticipants]).pipe(
            takeUntil(this.unsubscribe$),
            map((response: any) => [...response[0], ...response[1]])
        ).subscribe(
            response => {
                this.myParticipations = response;
            }
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getPicked(codePenka): void {
        this.codePenkaSelected = codePenka;
    }
}
