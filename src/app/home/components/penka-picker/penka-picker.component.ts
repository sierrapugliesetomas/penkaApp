import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { User } from '../../../core/interfaces/user';
import { combineLatest, Subject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../core/services/auth.service';
import { ParticipantsService } from '../../../core/services/participants.service';
import { PenkasService } from 'src/app/core/services/penkas.service';
import { Penka } from 'src/app/core/interfaces/penka';

@Component({
    selector: 'app-penka-picker',
    templateUrl: './penka-picker.component.html',
    styleUrls: ['./penka-picker.component.scss']
})
export class PenkaPickerComponent implements OnInit, OnDestroy {
    myParticipations = [];
    user = {} as User;
    penkas = [] as Penka [];
    selectedPenka = '';
    openParticipants;
    yesterdayFinishParticipants;
    private unsubscribe$ = new Subject<void>();
    @Output() pickedPenka = new EventEmitter<string>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private participantsService: ParticipantsService,
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.getUser();
        this.getParticipations();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getPicked(codePenka): void {
        this.pickedPenka.emit(codePenka);
        this.selectedPenka = codePenka;
    }

    selectPick($event): void {
        this.pickedPenka.emit($event.value);
    }

    private getUser(): void {
        this.user = this.firebase.auth().currentUser;
    }

    private getParticipations(): void {
        this.openParticipants = this.participantsService.getOpenParticipantByUserId(this.user.uid);
        this.yesterdayFinishParticipants = this.participantsService.getYesterdayFinishParticipantsByUserId(this.user.uid);

        combineLatest([this.openParticipants, this.yesterdayFinishParticipants]).pipe(
            takeUntil(this.unsubscribe$),
            map((response: any) => [...response[0], ...response[1]])
        ).subscribe(
            response => {
                this.myParticipations = response;
                if (this.myParticipations.length > 0) {
                    this.selectedPenka = this.myParticipations[0].codePenka;
                    let penkaCodes = this.myParticipations.map(p => p.codePenka);
                    this.getPenkas(penkaCodes);
                }
            }
        );
    }

    private getPenkas(penkaCodes: string[]): void {
        this.penkasService.getAllPenkas()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response: Penka[]) => {
                this.penkas = response.filter(penka => penkaCodes.includes(penka.codePenka));
            });
    }
}
