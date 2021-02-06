import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-banner',
    templateUrl: './main-banner.component.html',
    styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    go(): void {
        this.router.navigate(['penka/new']).catch();
    }
}
