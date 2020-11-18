import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home-templates',
    templateUrl: './home-templates.component.html',
    styleUrls: ['./home-templates.component.scss']
})
export class HomeTemplatesComponent implements OnInit {
    showFiller = false;

    @Input() template;

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }

    play(templateId): void {
        this.router.navigate(['penka/new3/template/' + templateId]);
    }

}
