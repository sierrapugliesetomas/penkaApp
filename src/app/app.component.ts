import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HideHeaderRoutes } from './layout/utils/HideHeaderRoutes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Penka';
    showHeaderFlag: boolean;

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                HideHeaderRoutes.includes(this.router.url) ? this.hideHeader() : this.showHeader()
            }
        });

    }

    private showHeader(): void {
        this.showHeaderFlag = true;
    }

    private hideHeader(): void {
        this.showHeaderFlag = false;
    }
}