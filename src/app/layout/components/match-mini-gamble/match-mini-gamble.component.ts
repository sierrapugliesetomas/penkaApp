import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-match-mini-gamble',
    templateUrl: './match-mini-gamble.component.html',
    styleUrls: ['./match-mini-gamble.component.scss']
})
export class MatchMiniGambleComponent implements OnInit {

    @Input() matchDate: string;
    @Input() homeTeamFlag: string;
    @Input() visitTeamFlag: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
