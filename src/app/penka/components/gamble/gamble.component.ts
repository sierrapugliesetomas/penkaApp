import {Component, OnInit} from '@angular/core';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {Observable} from 'rxjs';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {PenkasService} from '../../../core/services/penkas.service';
import {Penka} from '../../../core/interfaces/penka';

@Component({
    selector: 'app-gamble',
    templateUrl: './gamble.component.html',
    styleUrls: ['./gamble.component.scss']
})
export class GambleComponent implements OnInit {

    penkaId: string;
    ListMatches$: Observable<ListMatches[]>;
    penka = [] as Penka;
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private listMatchesService: ListMatchesService,
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.penkaId = params.id;
            }
        );

        this.ListMatches$ = this.listMatchesService.getMatches();

        this.penkasService.getPenkaById(this.penkaId).subscribe(
            res => this.penka = res,
            error => console.log(error));
    }

}
