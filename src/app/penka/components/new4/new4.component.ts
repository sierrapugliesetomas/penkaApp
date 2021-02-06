import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {Subject} from 'rxjs';
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
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-new4',
    templateUrl: './new4.component.html',
    styleUrls: ['./new4.component.scss']
})
export class New4Component implements OnInit, OnDestroy {
    title = 'Penca creada!';
    stepNumber = '4';
    stepTotal = '4';
    codePenka: string;

    /* Array ListMatches */
    listMatches = [] as ListMatches[];
    /* Array Penka */
    penka = [];

    user = {} as User;
    newParticipant = {} as Participant;
    newGamble = {} as Gamble;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private listMatchesService: ListMatchesService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private participantsService: ParticipantsService,
        private gambleService: GambleService,
        public dialog: MatDialog) {
    }

    ngOnInit(): void {
        /* User */
        this.user = this.firebase.auth().currentUser;
        /* Get CodePenka */
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        /* Get Penka */
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penka = res;
            }
        );
        /*******************/
        /* Get ListMatches */
        this.listMatchesService.getListMatches()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.listMatches = res;
            });
        /*******************/
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // tslint:disable-next-line:typedef
    modalGamble(penka: Penka) {
        this.dialog.open(GambleComponent, {
            panelClass: 'gambleModal',
            width: '400px',
            height: '600px',
            data: penka
        });
    }


    playGamble(codePenka): void {
        this.router.navigate(['/penka/gamble/' + codePenka]).catch(error => console.log(error));
    }

    goWatch(penkaId): void {
        this.router.navigate(['/penka/dashboard/' + penkaId]).catch(error => console.log(error));
    }

    sendInvitation(codePenka): void {
        const url = 'https://penkapro.com/penka/found';
        const msg = encodeURIComponent('Unete a la nueva penka de ' + this.user.displayName + '. Solo copia este codigo Penka ' + codePenka + ' e ingresa Aqui! ' + url);
        window.location.href = 'whatsapp://send?text=' + msg;
    }


}
