import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-back-space',
    templateUrl: './back-space.component.html',
    styleUrls: ['./back-space.component.scss']
})
export class BackSpaceComponent implements OnInit {

    constructor(private _location: Location) {
    }

    ngOnInit(): void {
    }

    back() {
        this._location.back();
    }
}
