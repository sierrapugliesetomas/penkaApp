import {Component, Input, OnInit} from '@angular/core';
import {ListMatchesService} from '../../../core/services/list-matches.service';

@Component({
    selector: 'app-single-match-picked',
    templateUrl: './single-match-picked.component.html',
    styleUrls: ['./single-match-picked.component.scss']
})
export class SingleMatchPickedComponent implements OnInit {

    @Input() match;

    constructor(
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
    }

// tslint:disable-next-line:typedef
    delPick(id) {
        this.listMatchesService.deleteMatch(id);
    }

}
