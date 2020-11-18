import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
    estilo: string;
    mediumValue = true;
    proValue = false;
    juniorValue = false;

    constructor() {
    }

    ngOnInit(): void {

    }

    junior() {
        this.juniorValue = true;
        this.mediumValue = false;
        this.proValue = false;

    }

    medium() {
        this.juniorValue = false;
        this.mediumValue = true;
        this.proValue = false;
    }

    pro() {
        this.juniorValue = false;
        this.mediumValue = false;
        this.proValue = true;
    }

}
