import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
    @Input() template;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    play(templateId): void {
        this.router.navigate(['penka/new3/template/' + templateId]).catch();
    }
}
