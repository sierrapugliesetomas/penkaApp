import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-button-back',
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.scss']
})
export class ButtonBackComponent implements OnInit {
    @Input() redirectURL: string;

    constructor(private _location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    back(): void {
        if(!this.redirectURL) {
            this._location.back();
        }
        else {
            this.router.navigate([this.redirectURL]);
        }
    }
}
