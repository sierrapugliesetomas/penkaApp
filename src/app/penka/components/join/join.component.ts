import { Component, OnDestroy, OnInit } from '@angular/core';
import { PenkasService } from '../../../core/services/penkas.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParticipantsService } from '../../../core/services/participants.service';
import { User } from '../../../core/interfaces/user';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit, OnDestroy {
    title = 'Participa de una PenKa';
    codePenka: string;
    penkaName: string;
    penkas = [];
    participantsId = [];
    user = {} as User;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private participantsService: ParticipantsService,
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );

        this.penkasService.getPenkasByLimitDate()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
                penkasRes => {
                    this.participantsService.getAllParticipantByUserId(this.user.uid)
                        .pipe(takeUntil(this.unsubscribe$))
                        .subscribe(
                            res => {
                                this.participantsId = res.map(p => p.codePenka);
                                this.penkas = penkasRes.filter(penka => !this.participantsId.includes(penka.codePenka));
                            }
                        )
                });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
