import {Component, Input, OnInit} from '@angular/core';
import {Penka} from '../../../core/interfaces/penka';

@Component({
    selector: 'app-penka-information-card',
    templateUrl: './penka-information-card.component.html',
    styleUrls: ['./penka-information-card.component.scss']
})
export class PenkaInformationCardComponent implements OnInit {

    @Input() penka: Penka;

    constructor() {
    }

    ngOnInit(): void {
    }

}
