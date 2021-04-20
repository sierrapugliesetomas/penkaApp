import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-list-matches-wait',
    templateUrl: './list-matches-wait.component.html',
    styleUrls: ['./list-matches-wait.component.scss']
})
export class ListMatchesWaitComponent implements OnInit, OnDestroy {

    @Input() codePenka: string;
    gambles = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.gambleService.getGamblesWait(this.user.uid, this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                const today = new Date()
                this.gambles = res.filter(g => g.limitDate.toDate() > today);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
