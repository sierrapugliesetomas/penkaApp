import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TemplatesService} from '../../../../core/services/templates.service';
import {Template} from '../../../../core/interfaces/template';
import {Observable} from 'rxjs';
import {ListMatches} from '../../../../core/interfaces/list-matches';
import {ListMatchesService} from '../../../../core/services/list-matches.service';
import {Penka} from '../../../../core/interfaces/penka';

@Component({
    selector: 'app-view-template',
    templateUrl: './view-template.component.html',
    styleUrls: ['./view-template.component.scss']
})
export class ViewTemplateComponent implements OnInit {

    //  value copy to clipboard
    value: string;

    templateId: string;
    template = [] as Template;
    listMatches$: Observable<ListMatches[]>;

    newPenka = {} as Penka;


    constructor(
        private activatedRoute: ActivatedRoute,
        private templateService: TemplatesService,
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            params => {
                this.templateId = params.templateId;
            });

        this.templateService.getTemplatesById(this.templateId).subscribe(
            res => this.template = res,
            error => console.log(error));

        this.listMatches$ = this.listMatchesService.getMatches();
        //  value copy to clipboard
        this.value = this.template.codePenka;
    }

}
