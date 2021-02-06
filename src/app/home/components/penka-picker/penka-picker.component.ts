import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ParticipantsService} from '../../../core/services/participants.service';

@Component({
    selector: 'app-penka-picker',
    templateUrl: './penka-picker.component.html',
    styleUrls: ['./penka-picker.component.scss']
})
export class PenkaPickerComponent implements OnInit, OnDestroy {
    myParticipations = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();
    @Output() pickedPenka = new EventEmitter<string>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.participantsService.getParticipantLimitByUserId(this.user.uid)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.myParticipations = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getPicked(codePenka): void {
        this.pickedPenka.emit(codePenka);
    }

    selectPick($event): void {
        this.pickedPenka.emit($event.value);
    }
}
