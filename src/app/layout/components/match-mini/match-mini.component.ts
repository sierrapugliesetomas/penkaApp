import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-match-mini',
    templateUrl: './match-mini.component.html',
    styleUrls: ['./match-mini.component.scss']
})
export class MatchMiniComponent implements OnInit {

    @Input() matchDate: string;
    @Input() homeTeamFlag: string;
    @Input() visitTeamFlag: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
