import {Component, Input, OnInit} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../core/interfaces/user';
import {GambleService} from '../../../core/services/gamble.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-match-gamble',
    templateUrl: './match-gamble.component.html',
    styleUrls: ['./match-gamble.component.scss']
})
export class MatchGambleComponent implements OnInit {

    mediumGamble: string; /* medium gamble from radio buttons */
    checked: true;

    @Input() match;
    @Input() codePenka;
    @Input() format;

    save: string;

    newGamble = {} as Gamble;
    user = {} as User;

    gambles$: Observable<Gamble[]>;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.gambles$ = this.gambleService.getGamble();
    }


    /* For Penka PRO */

    // tslint:disable-next-line:typedef
    homeTeam(event, match) {
        this.newGamble.homeTeamId = match.homeTeamId;
        this.newGamble.homeTeamName = match.homeTeamName;
        this.newGamble.homeTeamAlias = match.homeTeamAlias;
        this.newGamble.homeTeamFlagUrl = match.homeTeamFlag;
        this.newGamble.homeTeamScore = event.value;
    }

    // tslint:disable-next-line:typedef
    visitTeam(event, match) {
        this.newGamble.visitTeamId = match.visitTeamId;
        this.newGamble.visitTeamName = match.visitTeamName;
        this.newGamble.visitTeamAlias = match.visitTeamAlias;
        this.newGamble.visitTeamFlagUrl = match.visitTeamFlag;
        this.newGamble.visitTeamScore = event.value;
    }

    // tslint:disable-next-line:typedef
    saveGamblePro(match) {

        if ((this.newGamble.homeTeamId) && (this.newGamble.visitTeamId)) {
            this.save = 'save';
            let gamble: any = [];

            // query if exists gamble
            this.gambleService.getGambleByUpdate(this.user.uid, this.codePenka, match.singleMatchId).subscribe(
                res => {
                    gamble = res;

                    if (gamble.length > 0) {

                        // get winner or draw
                        let winnerId: string;
                        let draw: boolean;

                        if (this.newGamble.homeTeamScore > this.newGamble.visitTeamScore) {
                            winnerId = this.newGamble.homeTeamId;
                            draw = false;
                        }

                        if (this.newGamble.visitTeamScore > this.newGamble.homeTeamScore) {
                            winnerId = this.newGamble.visitTeamId;
                            draw = false;
                        }

                        if (this.newGamble.homeTeamScore === this.newGamble.visitTeamScore) {
                            winnerId = '';
                            draw = true;
                        }

                        // tslint:disable-next-line:max-line-length
                        this.gambleService.updateGamble(gamble[0].id, this.newGamble.homeTeamScore, this.newGamble.visitTeamScore, winnerId, draw);
                        // drop object
                        this.newGamble = {} as Gamble;
                        this.ngOnInit();

                    } else {

                        // get winner or draw
                        let winnerId: string;
                        let draw: boolean;

                        if (this.newGamble.homeTeamScore > this.newGamble.visitTeamScore) {
                            winnerId = this.newGamble.homeTeamId;
                            draw = false;
                        }

                        if (this.newGamble.visitTeamScore > this.newGamble.homeTeamScore) {
                            winnerId = this.newGamble.visitTeamId;
                            draw = false;
                        }

                        if (this.newGamble.homeTeamScore === this.newGamble.visitTeamScore) {
                            winnerId = '';
                            draw = true;
                        }

                        // Save collection gamble
                        this.newGamble.codePenka = this.codePenka;
                        this.newGamble.singleMatchId = match.singleMatchId;
                        this.newGamble.userId = this.user.uid;
                        this.newGamble.userName = this.user.displayName;
                        this.newGamble.userEmail = this.user.email;

                        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                        const today = new Date();
                        this.newGamble.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();
                        this.newGamble.winnerTeamId = winnerId;
                        this.newGamble.draw = draw;

                        this.gambleService.addGamble(this.newGamble);

                        // drop object
                        this.newGamble = {} as Gamble;
                        this.ngOnInit();
                    }
                },

                error => console.log(error));
        } else {
            alert('Debe Seleccionar el marcador de ambos equipos');
        }
    }

    /********************/
    /* For Penka Medium */

    // tslint:disable-next-line:typedef
    getGambleMedium() {
        if (this.mediumGamble === 'draw') {
            this.newGamble.draw = true;
            this.newGamble.winnerTeamId = '';
            this.newGamble.isDefault = true;
        } else {
            this.newGamble.draw = false;
            this.newGamble.winnerTeamId = this.mediumGamble;
            this.newGamble.isDefault = true;
        }
    }

    // tslint:disable-next-line:typedef
    saveGambleMedium(match) {

        if (this.mediumGamble) {

            this.save = 'save';
            let gamble: any = [];

            this.newGamble.homeTeamId = match.homeTeamId;
            this.newGamble.homeTeamName = match.homeTeamName;
            this.newGamble.homeTeamAlias = match.homeTeamAlias;
            this.newGamble.homeTeamFlagUrl = match.homeTeamFlag;
            this.newGamble.homeTeamScore = null;
            this.newGamble.visitTeamId = match.visitTeamId;
            this.newGamble.visitTeamName = match.visitTeamName;
            this.newGamble.visitTeamAlias = match.visitTeamAlias;
            this.newGamble.visitTeamFlagUrl = match.visitTeamFlag;
            this.newGamble.visitTeamScore = null;

            // query if exists gamble
            this.gambleService.getGambleByUpdate(this.user.uid, this.codePenka, match.singleMatchId).subscribe(
                res => {
                    gamble = res;

                    if (gamble.length > 0) {

                        // tslint:disable-next-line:max-line-length
                        this.gambleService.updateGamble(gamble[0].id, this.newGamble.homeTeamScore, this.newGamble.visitTeamScore, this.newGamble.winnerTeamId, this.newGamble.draw);
                        // drop object
                        this.newGamble = {} as Gamble;
                        this.ngOnInit();

                    } else {

                        // Save collection gamble
                        this.newGamble.codePenka = this.codePenka;
                        this.newGamble.singleMatchId = match.singleMatchId;
                        this.newGamble.userId = this.user.uid;
                        this.newGamble.userName = this.user.displayName;
                        this.newGamble.userEmail = this.user.email;

                        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                        const today = new Date();
                        this.newGamble.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();

                        this.gambleService.addGamble(this.newGamble);

                        // drop object
                        this.newGamble = {} as Gamble;
                        this.ngOnInit();
                    }
                },

                error => console.log(error));
        } else {
            alert('Debes selecionar un resultado');
        }
    }
}
