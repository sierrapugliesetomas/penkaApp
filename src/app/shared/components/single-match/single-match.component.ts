import {Component, Input, OnInit} from '@angular/core';
import {CompetitionsService} from '../../../core/services/competitions.service';

@Component({
    selector: 'app-single-match',
    templateUrl: './single-match.component.html',
    styleUrls: ['./single-match.component.scss']
})
export class SingleMatchComponent implements OnInit {

    @Input() match;
    competition = [];

    constructor(
        private competitionsService: CompetitionsService) {
    }

    ngOnInit(): void {
        this.competitionsService.getCompetitionsByName(this.match.competition)
            .subscribe(res => this.competition = res);
    }

}
