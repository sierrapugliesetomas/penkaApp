import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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

@Component({
    selector: 'app-new3',
    templateUrl: './new3.component.html',
    styleUrls: ['./new3.component.scss']
})
export class New3Component implements OnInit {

    codeTemplate: string;
    codePenka: string;

    codePenkaForTemplate: string;

    listMatches$: Observable<ListMatches[]>;

    newPenka = {} as Penka;
    user = {} as User;
    participant = {} as Participant;
    newGamble = {} as Gamble;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private listMatchesService: ListMatchesService,
        private participantService: ParticipantsService,
        private penkasService: PenkasService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codeTemplate = params.codeTemplate;
                this.codePenka = params.codePenka;
            }
        );

        this.listMatches$ = this.listMatchesService.getMatches();

        this.codePenkaForTemplate = '';
        const characters = 'KvWxYz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
            this.codePenkaForTemplate += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    // tslint:disable-next-line:typedef
    addPenkaFromTemplate() {

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
        } else if (!this.newPenka.dateLimit) {
            alert('Debes fijar una fecha limite de inscripcion');
        } else {


            // tslint:disable-next-line:radix
            const bet: number = parseInt(String(this.newPenka.bet));

            /// Save collection Penka
            this.newPenka.typePenka = 'template';
            this.newPenka.codeTemplate = this.codeTemplate;
            this.newPenka.codeTournament = '';
            this.newPenka.codeSingleMatch = '';
            this.newPenka.nParticipants = 1;
            this.newPenka.codePenka = this.codePenkaForTemplate;
            this.newPenka.makerId = this.user.uid;
            this.newPenka.makerName = this.user.displayName;
            this.newPenka.makerEmail = this.user.email;
            this.newPenka.makerPhoto = this.user.photoURL;
            this.newPenka.bet = bet;
            this.newPenka.status = '1';
            this.newPenka.accumulatedBet = bet;
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const today = new Date();
            this.newPenka.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();
            this.penkasService.addPenka(this.newPenka);

            this.participant.codePenka = this.codePenkaForTemplate;
            this.participant.userId = this.user.uid;
            this.participant.userName = this.user.displayName;
            this.participant.userEmail = this.user.email;
            this.participant.userPhoto = this.user.photoURL;
            this.participant.formatName = this.newPenka.formatName;
            this.participant.bet = bet;
            this.participant.visibility = this.newPenka.visibility;
            this.participant.accumulatedScore = 0;
            this.participant.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();
            this.participant.status = '1';
            this.participantService.addParticipant(this.participant);

            this.newPenka = {} as Penka;
            this.participant = {} as Participant;

            this.route.navigate(['/penka/new4/' + this.codePenkaForTemplate]).catch(error => console.log(error));
        }

    }

    // tslint:disable-next-line:typedef
    addPenkaFromSingleMatches() {

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
        } else if (!this.newPenka.dateLimit) {
            alert('Debes fijar una fecha limite de inscripcion');
        } else {


            // tslint:disable-next-line:radix
            const bet: number = parseInt(String(this.newPenka.bet));

            /// Save collection Penka
            this.newPenka.typePenka = 'singleMatches';
            this.newPenka.codeTemplate = '';
            this.newPenka.codeTournament = '';
            this.newPenka.codeSingleMatch = '';
            this.newPenka.nParticipants = 1;
            this.newPenka.codePenka = this.codePenka;
            this.newPenka.makerId = this.user.uid;
            this.newPenka.makerName = this.user.displayName;
            this.newPenka.makerEmail = this.user.email;
            this.newPenka.makerPhoto = this.user.photoURL;
            this.newPenka.bet = bet;
            this.newPenka.status = '1';
            this.newPenka.accumulatedBet = bet;
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const today = new Date();
            this.newPenka.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();
            this.penkasService.addPenka(this.newPenka);

            this.participant.codePenka = this.codePenka;
            this.participant.userId = this.user.uid;
            this.participant.userName = this.user.displayName;
            this.participant.userEmail = this.user.email;
            this.participant.userPhoto = this.user.photoURL;
            this.participant.formatName = this.newPenka.formatName;
            this.participant.bet = bet;
            this.participant.visibility = this.newPenka.visibility;
            this.participant.accumulatedScore = 0;
            this.participant.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();
            this.participant.status = '1';
            this.participantService.addParticipant(this.participant);

            /* Update list matches and add gambles */
            let listMatches = [];
            this.listMatchesService.getMBCP(this.codePenka).subscribe(
                res => {
                    listMatches = res;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < listMatches.length; i++) {
                        this.listMatchesService.updateStatus(listMatches[i].id, '1');
                    }
                },
                error => console.log(error));
            /***********************/

            this.newPenka = {} as Penka;
            this.participant = {} as Participant;

            this.route.navigate(['/penka/new4/' + this.codePenka]).catch(error => console.log(error));
        }

    }

}
