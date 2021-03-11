import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {ParticipantsService} from '../../../core/services/participants.service';
import {Participant} from '../../../core/interfaces/participant';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() makerId: string;
    @Input() codePenka: string;
    participants = [] as Participant[];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
    }

    ngOnChanges(changes: SimpleChanges): void {
        /* Get Participants by codePenka */
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

    updatePlace(event, id, userName): void {
        if (confirm('Desea seleccionar el ' + event.value + ' lugar para: ' + userName)) {
            this.participantsService.updatePlace(id, event.value);
        } else {
            this.ngOnInit();
        }
    }

    noYet(): void {
        alert('La Penka no ha finalizado');
    }
}
