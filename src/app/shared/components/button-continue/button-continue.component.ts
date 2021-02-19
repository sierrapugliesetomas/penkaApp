import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-button-continue',
    templateUrl: './button-continue.component.html',
    styleUrls: ['./button-continue.component.scss']
})
export class ButtonContinueComponent implements OnInit {

    @Input() codePenka: string;
    @Input() url: string;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    continue(): void {
        if (this.codePenka) {
            this.router.navigate([this.url, this.codePenka]);
        } else {
            this.router.navigate([this.url]);
        }
    }
}
