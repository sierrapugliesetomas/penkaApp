import {Component, OnInit} from '@angular/core';
import {PenkasService} from '../../../core/services/penkas.service';
import {Observable} from 'rxjs';
import {Penka} from '../../../core/interfaces/penka';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

    codePenka: string;
    penkaName: string;
    penkas$: Observable<Penka[]>;

    constructor(
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.penkas$ = this.penkasService.getPenkas();
    }

}
