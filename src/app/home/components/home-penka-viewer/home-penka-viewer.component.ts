import {Component, Input, OnInit} from '@angular/core';
import {ParticipantsService} from '../../../core/services/participants.service';
import {Observable} from 'rxjs';
import {Participant} from '../../../core/interfaces/participant';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {ListMatchesService} from '../../../core/services/list-matches.service';

@Component({
    selector: 'app-home-penka-viewer',
    templateUrl: './home-penka-viewer.component.html',
    styleUrls: ['./home-penka-viewer.component.scss']
})
export class HomePenkaViewerComponent implements OnInit {

    @Input() penkas = [];

    participants$: Observable<Participant[]>;
    listMatches$: Observable<ListMatches[]>;
    user = {} as User;

    codePenka: string;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService,
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.participants$ = this.participantsService.getParticipants();
        this.listMatches$ = this.listMatchesService.getMatches();

    }

    view(codePenka): void {
        this.codePenka = codePenka;
    }

    goWatch(penkaId): void {
        this.router.navigate(['/penka/view/' + penkaId]);
    }

}
