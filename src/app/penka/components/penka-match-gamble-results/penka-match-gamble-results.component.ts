import {Component, Input, OnInit} from '@angular/core';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {Gamble} from '../../../core/interfaces/gamble';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {GambleService} from '../../../core/services/gamble.service';

@Component({
    selector: 'app-penka-match-gamble-results',
    templateUrl: './penka-match-gamble-results.component.html',
    styleUrls: ['./penka-match-gamble-results.component.scss']
})
export class PenkaMatchGambleResultsComponent implements OnInit {

    @Input() match;
    @Input() codePenka;
    @Input() userId;

    singleMatch = [] as SingleMatch;
    gamble = [] as Gamble[];
    user = {} as User;
    startDate: any;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private singleMatchService: SingleMatchesService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        debugger;
        this.user = this.firebase.auth().currentUser;
        this.singleMatchService.getMatchById(this.match.singleMatchId).subscribe(
            res => this.singleMatch = res,
            error => console.log(error));
        this.gambleService.getMatch(this.codePenka, this.userId, this.match.singleMatchId).subscribe(
            res => this.gamble = res,
            error => console.log(error));
        this.startDate = new Date(this.match.startDate);
    }
}
