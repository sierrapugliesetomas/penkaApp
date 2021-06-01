import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {TemplatesService} from '../../../core/services/templates.service';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {takeUntil} from 'rxjs/operators';
import {CodePenkaService} from '../../../core/services/code-penka.service';

@Component({
    selector: 'app-new2',
    templateUrl: './new2.component.html',
    styleUrls: ['./new2.component.scss']
})

export class New2Component implements OnInit, OnDestroy {
    title = 'Organiza una Penka';
    url = '/penka/new3/singleMatches/';
    stepNumber = '2';
    stepTotal = '4';
    term: string;
    type: string;
    generateCodePenka: string;
    templates = [];
    singleMatches = [];
    listMatches = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();
    today = new Date();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private singleMatchesService: SingleMatchesService,
        private templateService: TemplatesService,
        private listMatchesService: ListMatchesService,
        private codePenkaService: CodePenkaService) {
        this.user = this.firebase.auth().currentUser;
        this.generateCodePenka = this.codePenkaService.generateCodePenka();
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
		
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.type = params.type;
            }
        );
        this.singleMatchesService.getMatchesPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatches = res.filter(sm => sm.limitDate.toDate() > this.today);
            });
        this.templateService.getTemplatesPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.templates = res;
                this.templates.forEach(item => {
                    if (this.today >= item.limitDate.toDate()) {
                        this.templateService.inactivated(item.id);
                    }
                });
            });
        this.listMatchesService.getListMatchesTempByCodePenka(this.generateCodePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.listMatches = res;
            }); 
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
	
    pickTeam(sm): void {
        const codeTemplate = '';
        const status = '0';
        const today = new Date();
        let response = [];
        let counter = 0;
        this.listMatchesService.verifiedIfExist(this.user.uid, sm.id, this.generateCodePenka).subscribe(
            res => {
                response = res;
                if (counter < 1) {
                    if (response.length === 0) {
                        this.listMatchesService.addMatch(
                            sm.id,
                            this.generateCodePenka,
                            codeTemplate,
                            sm.competition,
                            this.user.uid,
                            this.user.displayName,
                            this.user.email,
                            this.user.photoURL,
                            today,
                            sm.homeTeamId,
                            sm.homeTeamName,
                            sm.homeTeamAlias,
                            sm.homeTeamFlag,
                            sm.visitTeamId,
                            sm.visitTeamName,
                            sm.visitTeamAlias,
                            sm.visitTeamFlag,
                            sm.startDate,
                            sm.limitDate,
                            status);
                    }
                    counter++;
                }
            }, error => console.log(error));
    }
}