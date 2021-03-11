import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {Penka} from '../../../core/interfaces/penka';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {Participant} from '../../../core/interfaces/participant';
import {ParticipantsService} from '../../../core/services/participants.service';
import {PenkasService} from '../../../core/services/penkas.service';
import {Gamble} from '../../../core/interfaces/gamble';
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';
import {CodePenkaService} from '../../../core/services/code-penka.service';

@Component({
    selector: 'app-new3',
    templateUrl: './new3.component.html',
    styleUrls: ['./new3.component.scss']
})
export class New3Component implements OnInit, OnDestroy {
    title = 'Organiza una Penka';
    stepNumber = '3';
    stepTotal = '4';
    minDate = new Date();
    codeTemplate: string;
    codePenka: string;
    generateCodePenkaForTemplate: string;

    listMatchesForSingleMatches = [];
    listMatchesForTemplate = [];

    newPenka = {} as Penka;
    user = {} as User;
    participant = {} as Participant;
    newGamble = {} as Gamble;
    newListMatch = {} as ListMatches;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private listMatchesService: ListMatchesService,
        private participantService: ParticipantsService,
        private penkasService: PenkasService,
        private gambleService: GambleService,
        private codePenkaService: CodePenkaService) {
        this.generateCodePenkaForTemplate = this.codePenkaService.codePenka;
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codeTemplate = params.codeTemplate;
                this.codePenka = params.codePenka;
            }
        );

        if (this.codePenka) {
            this.listMatchesService.getListMatchesTempByCodePenka(this.codePenka)
                .pipe(
                    takeUntil(this.unsubscribe$)
                ).subscribe(
                res => {
                    this.listMatchesForSingleMatches = res;
                });
        }
        if (this.codeTemplate) {
            this.listMatchesService.getListMatchesByCodeTemplate(this.codeTemplate)
                .pipe(
                    takeUntil(this.unsubscribe$)
                ).subscribe(
                res => {
                    this.listMatchesForTemplate = res;
                });
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    addPenkaFromTemplate(): void {
        if (confirm('Deseas crear la Penka: “' + this.newPenka.name + ' ”')) {
            const today = new Date();
            const penkaFormat = this.newPenka.format;
            if (!this.newPenka.name) {
                alert('Debes poner un nombre para la penka');

            } else if (!this.newPenka.bet) {
                alert('Debes seleccionar un monto de apuesta');
            } else if (!this.newPenka.distributionBet) {
                alert('Debes seleccionar un distribucion del monto');
            } else if (!this.newPenka.limitParticipants) {
                alert('Debes fijar un numero limite de participantes');
            } else if (this.newPenka.limitParticipants < 2) {
                alert('Los participantes deben ser al menos 2 personas.');
            } else if (!this.newPenka.endDate) {
                alert('Debes fijar una fecha limite de inscripcion');
            } else {


                // tslint:disable-next-line:radix
                const bet: number = parseInt(String(this.newPenka.bet));

                /// Save collection Penka
                this.newPenka.type = 'template';
                this.newPenka.code = this.codeTemplate;
                this.newPenka.nParticipants = 1;
                this.newPenka.makerId = this.user.uid;
                this.newPenka.makerName = this.user.displayName;
                this.newPenka.makerEmail = this.user.email;
                this.newPenka.makerPhoto = this.user.photoURL;
                this.newPenka.bet = bet;
                this.newPenka.status = '1';
                this.newPenka.prize = bet;
                this.newPenka.createdAt = today;
                this.penkasService.addPenka(this.newPenka);

                this.participant.codePenka = this.generateCodePenkaForTemplate;
                this.participant.userId = this.user.uid;
                this.participant.userName = this.user.displayName;
                this.participant.userEmail = this.user.email;
                this.participant.userPhoto = this.user.photoURL;
                this.participant.formatName = this.newPenka.format;
                this.participant.bet = bet;
                this.participant.accumulatedScore = 0;
                this.participant.date = today;
                this.participant.status = '1';
                this.participantService.addParticipant(this.participant);

                /* Update list matches and add gambles */
                let listMatches = [];
                this.listMatchesService.getListMatchesByCodeTemplate(this.codeTemplate)
                    .pipe(
                        takeUntil(this.unsubscribe$)
                    ).subscribe(
                    res => {
                        listMatches = res;
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < listMatches.length; i++) {
                            /**************/
                            /* New Gamble */
                            this.newGamble.codePenka = this.generateCodePenkaForTemplate;
                            this.newGamble.penkaFormat = penkaFormat;
                            this.newGamble.singleMatchId = listMatches[i].singleMatchId;
                            this.newGamble.userId = this.user.uid;
                            this.newGamble.userName = this.user.displayName;
                            this.newGamble.userEmail = this.user.email;
                            this.newGamble.userPhoto = this.user.photoURL;
                            this.newGamble.homeTeamId = listMatches[i].homeTeamId;
                            this.newGamble.homeTeamName = listMatches[i].homeTeamName;
                            this.newGamble.homeTeamAlias = listMatches[i].homeTeamAlias;
                            this.newGamble.homeTeamFlag = listMatches[i].homeTeamFlag;
                            this.newGamble.visitTeamId = listMatches[i].visitTeamId;
                            this.newGamble.visitTeamName = listMatches[i].visitTeamName;
                            this.newGamble.visitTeamAlias = listMatches[i].visitTeamAlias;
                            this.newGamble.visitTeamFlag = listMatches[i].visitTeamFlag;
                            this.newGamble.date = today;
                            this.newGamble.winnerTeamId = '';
                            this.newGamble.draw = null;
                            this.newGamble.status = '1';
                            this.newGamble.saved = false;
                            this.newGamble.scoreAchieved = 0;
                            this.newGamble.startDate = listMatches[i].startDate;
                            this.gambleService.addGamble(this.newGamble);
                            this.newGamble = {} as Gamble;
                        }
                    }
                );
                /***********************/

                this.newPenka = {} as Penka;
                this.participant = {} as Participant;

                this.route.navigate(['/penka/new4/' + this.generateCodePenkaForTemplate]).catch(error => console.log(error));
            }
        }
    }

    addPenkaFromSingleMatches(): any {
        if (confirm('Deseas crear la Penka: “' + this.newPenka.name + ' ”')) {
            const today = new Date();
            const penkaFormat = this.newPenka.format;

            if (!this.newPenka.name) {
                alert('Debes poner un nombre para la penka');

            } else if (!this.newPenka.bet) {
                alert('Debes seleccionar un monto de apuesta');
            } else if (!this.newPenka.distributionBet) {
                alert('Debes seleccionar un distribucion del monto');
            } else if (!this.newPenka.limitParticipants) {
                alert('Debes fijar un numero limite de participantes');
            } else if (this.newPenka.limitParticipants < 2) {
                alert('Los participantes deben ser al menos 2 personas.');
            } else if (!this.newPenka.endDate) {
                alert('Debes fijar una fecha limite de inscripcion');
            } else {


                // tslint:disable-next-line:radix
                const bet: number = parseInt(String(this.newPenka.bet));

                /// Save collection Penka
                this.newPenka.type = 'singleMatches';
                this.newPenka.code = '';
                this.newPenka.nParticipants = 1;
                this.newPenka.code = this.codePenka;
                this.newPenka.makerId = this.user.uid;
                this.newPenka.makerName = this.user.displayName;
                this.newPenka.makerEmail = this.user.email;
                this.newPenka.makerPhoto = this.user.photoURL;
                this.newPenka.bet = bet;
                this.newPenka.status = '1';
                this.newPenka.prize = bet;
                this.newPenka.createdAt = today;
                this.penkasService.addPenka(this.newPenka);

                this.participant.codePenka = this.codePenka;
                this.participant.userId = this.user.uid;
                this.participant.userName = this.user.displayName;
                this.participant.userEmail = this.user.email;
                this.participant.userPhoto = this.user.photoURL;
                this.participant.formatName = this.newPenka.format;
                this.participant.bet = bet;
                this.participant.accumulatedScore = 0;
                this.participant.date = today;
                this.participant.status = '1';
                this.participantService.addParticipant(this.participant);

                /* Update list matches and add gambles */
                let listMatches = [];
                this.listMatchesService.getListMatchesTempByCodePenka(this.codePenka)
                    .pipe(
                        takeUntil(this.unsubscribe$)
                    ).subscribe(
                    res => {
                        listMatches = res;
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < listMatches.length; i++) {
                            /**************/
                            /* New Gamble */
                            this.newGamble.codePenka = this.codePenka;
                            this.newGamble.penkaFormat = penkaFormat;
                            this.newGamble.singleMatchId = listMatches[i].singleMatchId;
                            this.newGamble.userId = this.user.uid;
                            this.newGamble.userName = this.user.displayName;
                            this.newGamble.userEmail = this.user.email;
                            this.newGamble.userPhoto = this.user.photoURL;
                            this.newGamble.homeTeamId = listMatches[i].homeTeamId;
                            this.newGamble.homeTeamName = listMatches[i].homeTeamName;
                            this.newGamble.homeTeamAlias = listMatches[i].homeTeamAlias;
                            this.newGamble.homeTeamFlag = listMatches[i].homeTeamFlag;
                            this.newGamble.visitTeamId = listMatches[i].visitTeamId;
                            this.newGamble.visitTeamName = listMatches[i].visitTeamName;
                            this.newGamble.visitTeamAlias = listMatches[i].visitTeamAlias;
                            this.newGamble.visitTeamFlag = listMatches[i].visitTeamFlag;
                            this.newGamble.date = today;
                            this.newGamble.winnerTeamId = '';
                            this.newGamble.draw = null;
                            this.newGamble.status = '1';
                            this.newGamble.saved = false;
                            this.newGamble.scoreAchieved = 0;
                            this.newGamble.startDate = listMatches[i].startDate;

                            /* New List Match */
                            this.newListMatch.singleMatchId = listMatches[i].singleMatchId;
                            this.newListMatch.codePenka = this.codePenka;
                            this.newListMatch.userId = this.user.uid;
                            this.newListMatch.userName = this.user.displayName;
                            this.newListMatch.userEmail = this.user.email;
                            this.newListMatch.userPhoto = this.user.photoURL;
                            this.newListMatch.date = today;
                            this.newListMatch.homeTeamId = listMatches[i].homeTeamId;
                            this.newListMatch.homeTeamName = listMatches[i].homeTeamName;
                            this.newListMatch.homeTeamAlias = listMatches[i].homeTeamAlias;
                            this.newListMatch.homeTeamFlag = listMatches[i].homeTeamFlag;
                            this.newListMatch.visitTeamId = listMatches[i].visitTeamId;
                            this.newListMatch.visitTeamName = listMatches[i].visitTeamName;
                            this.newListMatch.visitTeamAlias = listMatches[i].visitTeamAlias;
                            this.newListMatch.visitTeamFlag = listMatches[i].visitTeamFlag;
                            this.newListMatch.startDate = listMatches[i].startDate;
                            this.newListMatch.limitDate = listMatches[i].limitDate;
                            this.newListMatch.status = '1';

                            this.gambleService.addGamble(this.newGamble);
                            this.listMatchesService.addMatchFromSingleMatch(this.newListMatch);

                            this.newGamble = {} as Gamble;
                            this.newListMatch = {} as ListMatches;
                        }
                    }
                );
                /***********************/

                this.newPenka = {} as Penka;
                this.participant = {} as Participant;

                this.route.navigate(['/penka/new4/' + this.codePenka]).catch(error => console.log(error));
            }
        }
    }

}
