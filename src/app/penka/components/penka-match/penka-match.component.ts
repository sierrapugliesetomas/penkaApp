import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-penka-match',
    templateUrl: './penka-match.component.html',
    styleUrls: ['./penka-match.component.scss']
})
export class PenkaMatchComponent implements OnInit {
    @Input() match;

    constructor() {
    }

    ngOnInit(): void {
    }

}
