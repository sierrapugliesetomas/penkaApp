import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-header-steps',
    templateUrl: './page-header-steps.component.html',
    styleUrls: ['./page-header-steps.component.scss']
})
export class PageHeaderStepsComponent implements OnInit {

    @Input() title;
    @Input() stepNumber;
    @Input() stepTotal;

    constructor() {
    }

    ngOnInit(): void {
    }

}
