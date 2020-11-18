import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {Penka} from '../../../core/interfaces/penka';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {Observable} from 'rxjs';
import {PenkaRequest} from '../../../core/interfaces/penkaRequest';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Participant} from '../../../core/interfaces/participant';
import {ParticipantsService} from '../../../core/services/participants.service';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

    penkas$: Observable<Penka[]>;

    request$: Observable<PenkaRequest[]>;
    user = {} as User;
    newParticipant = {} as Participant;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private penkasRequestService: PenkaRequestService,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;

        this.penkas$ = this.penkasService.getPenkas();

        this.request$ = this.penkasRequestService.getPenkaRequest();

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
        this.penkasRequestService.agreePenkaRequest(requestId);
    }

    // tslint:disable-next-line:typedef
    reject(requestId) {
        this.penkasRequestService.rejectPenkaRequest(requestId);
    }
}
