import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {Template} from '../../../core/interfaces/template';
import {TemplatesService} from '../../../core/services/templates.service';
import {PenkasService} from '../../../core/services/penkas.service';
import {Penka} from '../../../core/interfaces/penka';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    singleMatches$: Observable<SingleMatch[]>;
    templates$: Observable<Template[]>;
    penkas$: Observable<Penka[]>;

    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private singleMatchesService: SingleMatchesService,
        private templateService: TemplatesService,
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.singleMatches$ = this.singleMatchesService.getSingleMatches();

        this.templates$ = this.templateService.getTemplates();

        this.penkas$ = this.penkasService.getPenkas();

        this.user = this.firebase.auth().currentUser;
    }
}
