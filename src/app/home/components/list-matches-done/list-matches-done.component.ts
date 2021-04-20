import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-list-matches-done',
    templateUrl: './list-matches-done.component.html',
    styleUrls: ['./list-matches-done.component.scss']
})
export class ListMatchesDoneComponent implements OnInit, OnDestroy {

    @Input() codePenka: string;
    @Input() selectedParticipant: string;
    gambles = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();
    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private gambleService: GambleService) {
    }
    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.gambleService.getGambleByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                const today = new Date();
                this.gambles = res.filter(g => g.status === '2' || g.limitDate.toDate() < today);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
