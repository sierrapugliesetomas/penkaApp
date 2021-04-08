import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {takeUntil} from 'rxjs/operators';
import {GambleService} from '../../../core/services/gamble.service';
import {Gamble} from '../../../core/interfaces/gamble';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-gamble',
    templateUrl: './gamble.component.html',
    styleUrls: ['./gamble.component.scss']
})
export class GambleComponent implements OnInit, OnDestroy {
    title = 'Mis Jugadas';
    /* Get Penka from Penka/View */
    codePenka: string;
    /* Array Gambles */
    gambles = [] as Gamble[];
    user = {} as User;

    private unsubscribe$ = new Subject<void>();

    constructor(
        private _location: Location,
        public firebase: FirebaseApp,
        public auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private gambleService: GambleService,
        private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        /* User */
        this.user = this.firebase.auth().currentUser;
        /* Get Code Penka */
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        /* Get Gambles */
        this.gambleService.getGambleByCodePenkaAndUserId(this.user.uid, this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                res => {
                    this.gambles = res;
                });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // tslint:disable-next-line:typedef
    back() {
        this._location.back();
    }

    saveGambles() {
        this.gambles.forEach(gamble => {
            if (gamble.penkaFormat === 'PRO') {
                this.gambleService.editGambleScores(gamble.id, gamble.homeTeamScore, gamble.visitTeamScore);
                this.saveGamblePro(gamble);
            } else {
                // MEDIUM
                this.gambleService.updateGambleMedium(gamble.id, gamble.winnerTeamId, gamble.draw);
            }
        });
        this.back();
        const message = 'Jugada guardada';
        const action = '';
        this._snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['alert-success']
        });
    }

    saveGamblePro(match): void {
        let winnerId: string;
        let draw: boolean;
        if (match.homeTeamScore > match.visitTeamScore) {
            winnerId = match.homeTeamId;
            draw = false;
        }
        if (match.visitTeamScore > match.homeTeamScore) {
            winnerId = match.visitTeamId;
            draw = false;
        }
        if (match.homeTeamScore === match.visitTeamScore) {
            winnerId = '';
            draw = true;
        }
        this.gambleService.updateGamble(match.id, winnerId, draw);
    }
}