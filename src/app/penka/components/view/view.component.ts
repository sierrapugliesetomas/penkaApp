import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {Observable} from 'rxjs';
import {Penka} from '../../../core/interfaces/penka';
import {ParticipantsService} from '../../../core/services/participants.service';
import {Participant} from '../../../core/interfaces/participant';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {LoginComponent} from '../../../home/components/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {ParticipantsComponent} from '../participants/participants.component';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

    penkaId: string;
    penka$: Observable<Penka>;
    participants$: Observable<Participant[]>;
    listMatches$: Observable<ListMatches[]>;

    newParticipant = {} as Participant;
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private participantsService: ParticipantsService,
        private listMatchesService: ListMatchesService) {

    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.penkaId = params.id;
            }
        );

        this.penka$ = this.penkasService.getPenkaById(this.penkaId);
        this.participants$ = this.participantsService.getParticipants();
        this.listMatches$ = this.listMatchesService.getMatches();
    }

    // tslint:disable-next-line:typedef
    modalParticipants() {
        const dialogRef = this.dialog.open(ParticipantsComponent, {
            width: '1000px',
            height: '500px',
        });
      }

    // tslint:disable-next-line:typedef
    playGamble(penka) {
        let participant = [];
        this.participantsService.getParticipantByUserAndCodePenka(this.user.uid, penka.codePenka).subscribe(
            res => {
                participant = res;

                if (participant.length > 0) {

                    this.router.navigate(['/penka/gamble/' + this.penkaId]).catch(error => console.log(error));

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

                    this.router.navigate(['/penka/gamble/' + this.penkaId]).catch(error => console.log(error));
                }

            },
            error => console.log(error));
    }

}
