import {Component, Input, OnInit} from '@angular/core';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-match-mini-gamble',
    templateUrl: './match-mini-gamble.component.html',
    styleUrls: ['./match-mini-gamble.component.scss']
})
export class MatchMiniGambleComponent implements OnInit {
    @Input() match;
    singleMatch$: Observable<SingleMatch>;

    constructor(
        private singleMatchesService: SingleMatchesService) {
    }

    ngOnInit(): void {
        this.singleMatch$ = this.singleMatchesService.getMatchById(this.match.id);
    }
}
