import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Template} from '../../../core/interfaces/template';
import {TemplatesService} from '../../../core/services/templates.service';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';

@Component({
    selector: 'app-new2',
    templateUrl: './new2.component.html',
    styleUrls: ['./new2.component.scss']
})
export class New2Component implements OnInit {

    type: string;
    codePenka: string;

    templates$: Observable<Template[]>;
    singleMatches$: Observable<SingleMatch[]>;
    listMatches$: Observable<ListMatches[]>;

    matchesPicked = {} as ListMatches;
    user = {} as User;


    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private singleMatchesService: SingleMatchesService,
        private templatesService: TemplatesService,
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.type = params.type;
            }
        );
        this.singleMatches$ = this.singleMatchesService.getSingleMatches();
        this.templates$ = this.templatesService.getTemplates();
        this.listMatches$ = this.listMatchesService.getMatches();

        this.codePenka = '';
        const characters = 'KvWxYz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
            this.codePenka += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    // tslint:disable-next-line:typedef
    pickTeam(sm) {
        const codeTemplate = '';
        const status = '0';
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const today = new Date();
        const date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();

        this.listMatchesService.addMatch(
            sm.id,
            this.codePenka,
            codeTemplate,
            this.user.uid,
            this.user.displayName,
            this.user.email,
            this.user.photoURL,
            date,
            sm.homeTeamId,
            sm.homeTeamName,
            sm.homeTeamAlias,
            sm.homeTeamFlag,
            sm.visitTeamId,
            sm.visitTeamName,
            sm.visitTeamAlias,
            sm.visitTeamFlag,
            sm.startDate,
            sm.startTime,
            status
        );

    }

    // tslint:disable-next-line:typedef
    delPick(id) {
        this.listMatchesService.deleteMatch(id);
    }

    // tslint:disable-next-line:typedef
    makePenka() {
        this.router.navigate(['/penka/new3/singleMatches/' + this.codePenka]);
    }

}
