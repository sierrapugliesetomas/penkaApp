import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {SingleMatchesService} from '../../../core/services/single-matches.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {SingleMatch} from '../../../core/interfaces/single-match';
import {ParticipantsService} from '../../../core/services/participants.service';
import {Participant} from '../../../core/interfaces/participant';

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

    codePenka: string;
    listMatches = [] as ListMatches[];
    singleMatches = [] as SingleMatch[];
    participants = [] as Participant[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private singleMatchesService: SingleMatchesService,
        private listMatchesService: ListMatchesService,
        private participantService: ParticipantsService) {

    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );

        this.singleMatchesService.getSingleMatches().subscribe(
            res => this.singleMatches = res,
            error => console.log(error));

        this.listMatchesService.getMBCP(this.codePenka).subscribe(
            res => this.listMatches = res,
            error => console.log(error));

        this.participantService.getParticipants().subscribe(
            res => this.participants = res,
            error => console.log(error));
    }

}
