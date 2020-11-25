import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Competition} from '../../../core/interfaces/competition';
import {CompetitionsService} from '../../../core/services/competitions.service';

@Component({
    selector: 'app-match-singlematch',
    templateUrl: './match-singlematch.component.html',
    styleUrls: ['./match-singlematch.component.scss']
})
export class MatchSinglematchComponent implements OnInit {

    @Input() match;

    competition$: Observable<Competition>;

    constructor(
        private competitionsService: CompetitionsService) {

    }

    ngOnInit(): void {
        this.competition$ = this.competitionsService.getCompetitionById(this.match.competition);
    }
}
