import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Penka} from '../../../core/interfaces/penka';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {Participant} from '../../../core/interfaces/participant';
import {ParticipantsService} from '../../../core/services/participants.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    participants$: Observable<Participant[]>;
    status = '1';
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.participants$ = this.participantsService.getParticipants();
        this.user = this.firebase.auth().currentUser;
    }

    // tslint:disable-next-line:typedef
    changeStatus(status) {
        this.status = status;
        console.log(this.status);
    }

}
