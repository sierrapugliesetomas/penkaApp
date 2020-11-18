import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

    @Input() match;

    constructor() {
    }

    ngOnInit(): void {
    }

}
