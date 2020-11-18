import {Component, OnInit} from '@angular/core';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {Observable} from 'rxjs';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {Penka} from '../../../core/interfaces/penka';
import {ParticipantsService} from '../../../core/services/participants.service';
import {User} from '../../../core/interfaces/user';
import {AuthService} from '../../../core/services/auth.service';
import {FirebaseApp} from '@angular/fire';
import {Participant} from '../../../core/interfaces/participant';
import {Gamble} from '../../../core/interfaces/gamble';
import {MatDialog} from '@angular/material/dialog';
import {GambleComponent} from '../gamble/gamble.component';

@Component({
    selector: 'app-new4',
    templateUrl: './new4.component.html',
    styleUrls: ['./new4.component.scss']
})
export class New4Component implements OnInit {

    codePenka: string;
    listMatches$: Observable<ListMatches[]>;
    penkas$: Observable<Penka[]>;

    user = {} as User;
    newParticipant = {} as Participant;
    newGamble = {} as Gamble;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private listMatchesService: ListMatchesService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private participantsService: ParticipantsService,
        public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        this.penkas$ = this.penkasService.getPenkaByCodePenka(this.codePenka);
        this.listMatches$ = this.listMatchesService.getMatches();
    }

    modalGamble(penka: Penka) {
        this.dialog.open(GambleComponent, {
            panelClass: 'gambleModal',
            width: '400px',
            height: '600px',
            data: penka
        });
    }


    // tslint:disable-next-line:typedef
    playGamble(penka) {
        let participant = [];
        this.participantsService.getParticipantByUserAndCodePenka(this.user.uid, penka.codePenka).subscribe(
            res => {
                participant = res;

                if (participant.length > 0) {

                    this.router.navigate(['/penka/gamble/' + penka.id]).catch(error => console.log(error));

                } else {

                    const totalBet: number = penka.accumulatedBet + penka.bet;
                    const totalParticipants: number = penka.nParticipants + 1;
                    this.penkasService.updatePenka(penka.id, totalParticipants, totalBet);

                    /// Save collection participants
                    this.newParticipant.codePenka = penka.codePenka;
                    this.newParticipant.userId = this.user.uid;
                    this.newParticipant.userName = this.user.displayName;
                    this.newParticipant.userEmail = this.user.email;
                    this.newParticipant.formatName = penka.formatName;
                    this.newParticipant.bet = penka.bet;
                    this.newParticipant.accumulatedScore = 0;

                    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                    const today = new Date();
                    this.newParticipant.date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();
                    this.participantsService.addParticipant(this.newParticipant);

                    this.router.navigate(['/penka/gamble/' + penka.id]).catch(error => console.log(error));
                }

            },
            error => console.log(error));
    }

    sendInvitation(codePenka) {
        const url = 'https://penkapro.com/penka/found';
        const msg = encodeURIComponent('Unete a la nueva penka de ' + this.user.displayName + '. Solo copia este codigo Penka ' + codePenka + ' e ingresa Aqui! ' + url);
        window.location.href = 'whatsapp://send?text=' + msg;
    }


}
