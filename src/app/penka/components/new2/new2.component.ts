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

@Component({
    selector: 'app-new2',
    templateUrl: './new2.component.html',
    styleUrls: ['./new2.component.scss']
})
export class New2Component implements OnInit, OnDestroy {
    title = 'Organiza una Penka';
    stepNumber = '2';
    stepTotal = '4';
    term: string;
    type: string;
    codePenka: string;
    templates = [];
    singleMatches = [];
    listMatches = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();
    today = new Date();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private singleMatchesService: SingleMatchesService,
        private templateService: TemplatesService,
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.type = params.type;
            }
        );
        const characters = 'KvWxYz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
            this.codePenka += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.singleMatchesService.getSingleMatchesPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatches = res;
                this.singleMatches.forEach(item => {
                    if (this.today >= item.limitDate.toDate()) {
                        this.singleMatchesService.inactivated(item.id);
                    }
                });
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
        this.listMatchesService.getListMatchesTempByCodePenka(this.codePenka)
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
        this.listMatchesService.verifiedIfExist(this.user.uid, sm.id, this.codePenka).subscribe(
            res => {
                response = res;
                if (counter < 1) {
                    if (response.length === 0) {
                        this.listMatchesService.addMatch(
                            sm.id,
                            this.codePenka,
                            codeTemplate,
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

    makePenka(): void {
        this.router.navigate(['/penka/new3/singleMatches/' + this.codePenka]).catch();
    }

}
