import {Component, Input, OnInit} from '@angular/core';
import {CompetitionsService} from '../../../core/services/competitions.service';
import {Observable} from 'rxjs';
import {Competition} from '../../../core/interfaces/competition';

@Component({
    selector: 'app-home-single-matches',
    templateUrl: './home-single-matches.component.html',
    styleUrls: ['./home-single-matches.component.scss']
})
export class HomeSingleMatchesComponent implements OnInit {

    @Input() match;

    competition$: Observable<Competition>;

    constructor(
        private competitionsService: CompetitionsService) {

    }

    ngOnInit(): void {
        this.competition$ = this.competitionsService.getCompetitionById(this.match.competition);
    }

}
