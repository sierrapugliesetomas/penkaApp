import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {Subject} from 'rxjs';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {User} from '../../../core/interfaces/user';
import {AuthService} from '../../../core/services/auth.service';
import {FirebaseApp} from '@angular/fire';
import {Gamble} from '../../../core/interfaces/gamble';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-new4',
    templateUrl: './new4.component.html',
    styleUrls: ['./new4.component.scss']
})
export class New4Component implements OnInit, OnDestroy {
    title = 'Tu Penka ha sido creada!';
    stepNumber = '4';
    stepTotal = '4';
    codePenka: string;
    listMatches = [];
    penka = [];
    user = {} as User;
    private unsubscribe$ = new Subject<void>();
    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private listMatchesService: ListMatchesService,
        private penkasService: PenkasService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penka = res;
            }
        );
        this.listMatchesService.getListMatches()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.listMatches = res;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
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
