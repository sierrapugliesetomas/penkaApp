import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {PenkasService} from '../../../core/services/penkas.service';
import {Subject} from 'rxjs';
import {Gamble} from '../../../core/interfaces/gamble';
import {Participant} from '../../../core/interfaces/participant';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {GambleService} from '../../../core/services/gamble.service';
import {ParticipantsService} from '../../../core/services/participants.service';

@Component({
    selector: 'app-button-notification',
    templateUrl: './button-notification.component.html',
    styleUrls: ['./button-notification.component.scss']
})
export class ButtonNotificationComponent implements OnInit, OnDestroy {

    penkas = [];
    @Input() codePenka: string;
    @Input() request;
    private unsubscribe$ = new Subject<void>();

    ifExist = [];

    newParticipant = {} as Participant;
    newGamble = {} as Gamble;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private listMatchesService: ListMatchesService,
        private penkaRequestService: PenkaRequestService,
        private gambleService: GambleService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penkas = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    agree(requestId, penkaId, typePenka, codePenka, codeTemplate, userId, userName, userEmail, userPhoto, formatName, visibility, bet): void {
        let penka: any = [];
        let acumulatedBet = 0;
        let nParticipants = 0;
        let counter = 1;
        let ifExist = [];
        const today = new Date();

        this.participantsService.getParticipantByUserAndCodePenka(userId, codePenka).subscribe(
            res => ifExist = res,
            error => console.log(error));

        if (ifExist.length > 0) {
            alert('El usuario ya esta jugando esa penka');
            this.penkaRequestService.rejectPenkaRequest(requestId);
        } else {
            /* Fill new participant object */
            this.newParticipant.codePenka = codePenka;
            this.newParticipant.userId = userId;
            this.newParticipant.userName = userName;
            this.newParticipant.userEmail = userEmail;
            this.newParticipant.userPhoto = userPhoto;
            this.newParticipant.formatName = formatName;
            this.newParticipant.visibility = visibility;
            this.newParticipant.bet = bet;
            this.newParticipant.accumulatedScore = 0;
            this.newParticipant.date = today;
            this.newParticipant.status = '1';


            this.penkasService.getPenkaById(penkaId).subscribe(
                res => {
                    penka = res;

                    if (counter === 1) {
                        /* Verified is available participants limit */
                        if (penka.limitParticipants > penka.nParticipants) {

                            /* increment nParticipants and bet */
                            acumulatedBet = penka.accumulatedBet + bet;
                            nParticipants = penka.nParticipants + 1;
                            this.penkasService.updatePenka(penkaId, nParticipants, acumulatedBet);
                            this.participantsService.addParticipant(this.newParticipant);

                            /* add gamble by user */
                            if (typePenka === 'template') {
                                /* Update list matches and add gambles */
                                let listMatches = [];
                                this.listMatchesService.getListMatchesByCodeTemplate(codeTemplate)
                                    .subscribe(
                                        results => {
                                            listMatches = results;
                                            // tslint:disable-next-line:prefer-for-of
                                            for (let i = 0; i < listMatches.length; i++) {
                                                /**************/
                                                /* New Gamble */
                                                this.newGamble.codePenka = codePenka;
                                                this.newGamble.penkaFormat = formatName;
                                                this.newGamble.singleMatchId = listMatches[i].singleMatchId;
                                                this.newGamble.userId = userId;
                                                this.newGamble.userName = userName;
                                                this.newGamble.userEmail = userEmail;
                                                this.newGamble.userPhoto = userPhoto;
                                                this.newGamble.homeTeamId = listMatches[i].homeTeamId;
                                                this.newGamble.homeTeamName = listMatches[i].homeTeamName;
                                                this.newGamble.homeTeamAlias = listMatches[i].homeTeamAlias;
                                                this.newGamble.homeTeamFlag = listMatches[i].homeTeamFlag;
                                                this.newGamble.homeTeamScore = 0;
                                                this.newGamble.visitTeamId = listMatches[i].visitTeamId;
                                                this.newGamble.visitTeamName = listMatches[i].visitTeamName;
                                                this.newGamble.visitTeamAlias = listMatches[i].visitTeamAlias;
                                                this.newGamble.visitTeamFlag = listMatches[i].visitTeamFlag;
                                                this.newGamble.visitTeamScore = 0
                                                this.newGamble.date = today;
                                                this.newGamble.winnerTeamId = '';
                                                this.newGamble.draw = true;
                                                this.newGamble.status = '1';
                                                this.newGamble.saved = false;
                                                this.newGamble.scoreAchieved = 0;
                                                this.newGamble.startDate = listMatches[i].startDate;
                                                this.gambleService.addGamble(this.newGamble);
                                                this.newGamble = {} as Gamble;
                                            }
                                        },
                                        error => console.log(error));
                                /***********************/
                            }

                            if (typePenka === 'singleMatches') {
                                /* Update list matches and add gambles */
                                let listMatches = [];
                                this.listMatchesService.getListMatchesByCodePenka(codePenka)
                                    .subscribe(
                                        results => {
                                            listMatches = results;

                                            // tslint:disable-next-line:prefer-for-of
                                            for (let i = 0; i < listMatches.length; i++) {
                                                /**************/
                                                /* New Gamble */
                                                this.newGamble.codePenka = codePenka;
                                                this.newGamble.penkaFormat = formatName;
                                                this.newGamble.singleMatchId = listMatches[i].singleMatchId;
                                                this.newGamble.userId = userId;
                                                this.newGamble.userName = userName;
                                                this.newGamble.userEmail = userEmail;
                                                this.newGamble.userPhoto = userPhoto;
                                                this.newGamble.homeTeamId = listMatches[i].homeTeamId;
                                                this.newGamble.homeTeamName = listMatches[i].homeTeamName;
                                                this.newGamble.homeTeamAlias = listMatches[i].homeTeamAlias;
                                                this.newGamble.homeTeamFlag = listMatches[i].homeTeamFlag;
                                                this.newGamble.visitTeamScore = 0;
                                                this.newGamble.visitTeamId = listMatches[i].visitTeamId;
                                                this.newGamble.visitTeamName = listMatches[i].visitTeamName;
                                                this.newGamble.visitTeamAlias = listMatches[i].visitTeamAlias;
                                                this.newGamble.visitTeamFlag = listMatches[i].visitTeamFlag;
                                                this.newGamble.visitTeamScore = 0;
                                                this.newGamble.date = today;
                                                this.newGamble.winnerTeamId = '';
                                                this.newGamble.draw = true;
                                                this.newGamble.status = '1';
                                                this.newGamble.saved = false;
                                                this.newGamble.scoreAchieved = 0;
                                                this.newGamble.startDate = listMatches[i].startDate;
                                                this.gambleService.addGamble(this.newGamble);
                                                this.newGamble = {} as Gamble;
                                            }
                                        },
                                        error => console.log(error));
                                /***********************/
                            }

                            this.penkaRequestService.agreePenkaRequest(requestId);
                            counter++;
                        } else {
                            alert('La penka no tiene cupos disponibles');
                            this.penkaRequestService.rejectPenkaRequest(requestId);
                        }
                    }
                }, error => console.log(error));
        }
    }
    
    reject(requestId): void {
        this.penkaRequestService.rejectPenkaRequest(requestId);
    }

}
