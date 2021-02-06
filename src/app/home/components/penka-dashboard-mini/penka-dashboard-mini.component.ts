import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {ParticipantsService} from '../../../core/services/participants.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-penka-dashboard-mini',
    templateUrl: './penka-dashboard-mini.component.html',
    styleUrls: ['./penka-dashboard-mini.component.scss']
})
export class PenkaDashboardMiniComponent implements OnInit, OnChanges, OnDestroy {

    @Input() codePenka: string;

    selectedParticipant: string;
    penka = [];
    user = {} as User;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private penkasService: PenkasService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
    }

    ngOnChanges(): void {
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penka = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    goWatch(codePenka): void {
        this.router.navigate(['/penka/dashboard/' + codePenka]).catch();
    }

    playGamble(codePenka): void {
        this.router.navigate(['/penka/gamble/' + codePenka]).catch();
    }

    // tslint:disable-next-line:typedef
    selectParticipant(userId) {
        this.selectedParticipant = userId;
    }
}
