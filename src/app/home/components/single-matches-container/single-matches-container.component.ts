import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {takeUntil} from 'rxjs/operators';
import {CodePenkaService} from '../../../core/services/code-penka.service';

@Component({
    selector: 'app-single-matches-container',
    templateUrl: './single-matches-container.component.html',
    styleUrls: ['./single-matches-container.component.scss']
})
export class SingleMatchesContainerComponent implements OnInit, OnDestroy {
    generateCodePenka: string;
    singleMatches = [];
    listMatches = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();
    today = new Date();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private singleMatchesService: SingleMatchesService,
        private listMatchesService: ListMatchesService,
        private codePenkaService: CodePenkaService) {
        this.user = this.firebase.auth().currentUser;
        this.generateCodePenka = this.codePenkaService.codePenka;
    }

    ngOnInit(): void {
        this.singleMatchesService.getMatchesPublicLimit()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.singleMatches = res;
                this.singleMatches.forEach(item => {
                    if (this.today >= item.limitDate.toDate()) {
                        this.singleMatchesService.changeMatchState(item.id, '2');
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

    pickTeam(match): any {
        const codeTemplate = '';
        const status = '0';
        let response = [];
        let counter = 0;
        this.listMatchesService.verifiedIfExist(this.user.uid, match.id, this.generateCodePenka).subscribe(
            res => {
                response = res;
                if (counter < 1) {
                    if (response.length === 0) {
                        this.listMatchesService.addMatch(
                            match.id,
                            this.generateCodePenka,
                            codeTemplate,
                            this.user.uid,
                            this.user.displayName,
                            this.user.email,
                            this.user.photoURL,
                            this.today,
                            match.homeTeamId,
                            match.homeTeamName,
                            match.homeTeamAlias,
                            match.homeTeamFlag,
                            match.visitTeamId,
                            match.visitTeamName,
                            match.visitTeamAlias,
                            match.visitTeamFlag,
                            match.startDate,
                            match.limitDate,
                            status);
                    }
                    counter++;
                }
            }, error => console.log(error));
    }

    makePenka(): any {
        this.router.navigate(['/penka/new3/singleMatches/' + this.generateCodePenka]).catch();
    }
}
