import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Participant} from '../../../core/interfaces/participant';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ParticipantsService} from '../../../core/services/participants.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {PenkasService} from '../../../core/services/penkas.service';
import {Penka} from '../../../core/interfaces/penka';

@Component({
    selector: 'app-view-mini',
    templateUrl: './view-mini.component.html',
    styleUrls: ['./view-mini.component.scss']
})
export class ViewMiniComponent implements OnInit {

    @Input() codePenka;
    @Input() status;

    penka$: Observable<Penka[]>;
    participants$: Observable<Participant[]>;
    listMatches$: Observable<ListMatches[]>;
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private penkasService: PenkasService,
        private participantsService: ParticipantsService,
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.participants$ = this.participantsService.getParticipants();
        this.listMatches$ = this.listMatchesService.getMatches();
        this.penka$ = this.penkasService.getPenkaByCodePenka(this.codePenka);
    }

    goWatch(penkaId): void {
        this.router.navigate(['/penka/view/' + penkaId]);
    }

}
