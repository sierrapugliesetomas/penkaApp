import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-button-back',
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.scss']
})
export class ButtonBackComponent implements OnInit {
    constructor(private _location: Location) {
    }

    ngOnInit(): void {
    }

    back(): void {
        this._location.back();
    }
}
