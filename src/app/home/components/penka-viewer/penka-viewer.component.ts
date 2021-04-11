import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ParticipantsService} from '../../../core/services/participants.service';
import {takeUntil} from 'rxjs/operators';

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
        this.participantsService.getParticipantByUserId(this.user.uid)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.myParticipations = res.filter(p => p.status === '1');
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getPicked(codePenka): void {
        this.codePenkaSelected = codePenka;
        console.log(this.codePenkaSelected);
    }
}
