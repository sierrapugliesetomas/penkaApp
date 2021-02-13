import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
    stepNumber = '1';
    stepTotal = '4';
    title = 'Organiza una Penka';

    constructor() {
    }

    ngOnInit(): void {

    }

}
