import {Component, Input, OnInit} from '@angular/core';
import { SingleMatch } from 'src/app/core/interfaces/single-match';

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
