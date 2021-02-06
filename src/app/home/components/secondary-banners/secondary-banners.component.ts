import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-secondary-banners',
    templateUrl: './secondary-banners.component.html',
    styleUrls: ['./secondary-banners.component.scss']
})
export class SecondaryBannersComponent implements OnInit {

    constructor(
        private router: Router) {
    }

    ngOnInit(): void {
    }

    goMakePenka(): void {
        this.router.navigate(['penka/new']).catch();
    }

    goJoinPenka(): void {
        this.router.navigate(['penka/join']).catch();
    }

    goRulesPenka(): void {
        this.router.navigate(['penka/faq']).catch();
    }
}
