import {Component, Input, OnInit} from '@angular/core';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {Gamble} from '../../../core/interfaces/gamble';
import {GambleService} from '../../../core/services/gamble.service';
import {Observable} from 'rxjs';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-match-result',
    templateUrl: './match-result.component.html',
    styleUrls: ['./match-result.component.scss']
})
export class MatchResultComponent implements OnInit {
    @Input() match;
    @Input() codePenka;
    @Input() userId;

    singleMatch = [] as SingleMatch;
    gamble = [] as Gamble[];
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private singleMatchService: SingleMatchesService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.singleMatchService.getSingleMatchById(this.match.singleMatchId).subscribe(
            res => this.singleMatch = res,
            error => console.log(error));

        this.gambleService.getMatch(this.codePenka, this.userId, this.match.singleMatchId).subscribe(
            res => this.gamble = res,
            error => console.log(error));
    }

}
