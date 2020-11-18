import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FirebaseApp} from '@angular/fire';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../../home/components/login/login.component';
import {User} from '../../../core/interfaces/user';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {Observable} from 'rxjs';
import {PenkaRequest} from '../../../core/interfaces/penkaRequest';
import {Penka} from '../../../core/interfaces/penka';
import {ActivatedRoute, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {Participant} from '../../../core/interfaces/participant';
import {ParticipantsService} from '../../../core/services/participants.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // current user
    user = {} as User;
    request$: Observable<PenkaRequest[]>;
    requestCount = 0;
    penkas$: Observable<Penka[]>;
    newParticipant = {} as Participant;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private penkaRequestService: PenkaRequestService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.request$ = this.penkaRequestService.getPenkaRequest();
        this.penkas$ = this.penkasService.getPenkas();

    }

    // tslint:disable-next-line:typedef
    modalLogin() {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '400px',
            height: '300px',
        });
        setTimeout(() => {
            dialogRef.close();
        }, 3000);
    }

    getNotification() {

    }

    // tslint:disable-next-line:typedef
    agree(requestId, penkaId, codePenka, userId, userName, userEmail, userPhoto, formatName, visibility, bet) {
        let penka: any = [];
        let acumulatedBet = 0;
        let nParticipants = 0;
        let counter = 1;

        // incrementing accumulated bet and participants number
        this.penkasService.getPenkaById(penkaId).subscribe(
            res => {
                penka = res;

                if (counter === 1) {
                    acumulatedBet = penka.accumulatedBet + bet;
                    nParticipants = penka.nParticipants + 1;
                    this.penkasService.updatePenka(penkaId, nParticipants, acumulatedBet);
                    counter++;
                }

            },
            error => console.log(error));

        // get date
        const months = ['Jan', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const today = new Date();
        const date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();

        this.newParticipant.codePenka = codePenka;
        this.newParticipant.userId = userId;
        this.newParticipant.userName = userName;
        this.newParticipant.userEmail = userEmail;
        this.newParticipant.userPhoto = userPhoto;
        this.newParticipant.formatName = formatName;
        this.newParticipant.visibility = visibility;
        this.newParticipant.bet = bet;
        this.newParticipant.accumulatedScore = 0;
        this.newParticipant.date = date;
        this.newParticipant.status = '1';
        this.participantsService.addParticipant(this.newParticipant);
        this.penkaRequestService.agreePenkaRequest(requestId);
    }

    // tslint:disable-next-line:typedef
    reject(requestId) {
        this.penkaRequestService.rejectPenkaRequest(requestId);
    }
}
