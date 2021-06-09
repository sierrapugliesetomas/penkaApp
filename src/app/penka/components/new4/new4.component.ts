import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListMatchesService } from '../../../core/services/list-matches.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PenkasService } from '../../../core/services/penkas.service';
import { User } from '../../../core/interfaces/user';
import { AuthService } from '../../../core/services/auth.service';
import { FirebaseApp } from '@angular/fire';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private penkasService: PenkasService,
        private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(
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

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    goDashboard(codePenka): void {
        this.router.navigate(['/penka/dashboard/' + codePenka], { state: { redirect: '/home'} }).catch(error => console.log(error));
    }

    shareByWhatsappWeb(codePenka): void {
        const url = 'https://penkapro.com/penka/join/' + codePenka;
        const msg = encodeURIComponent('¡Únete a mi Penka, sólo ingresa aquí! ' + url);
        window.open('https://web.whatsapp.com/send?text=' + msg);
    }

    shareByWhatsappMobile(codePenka): void {
        const url = 'https://penkapro.com/penka/join/' + codePenka;
        const msg = encodeURIComponent('¡Únete a mi Penka, sólo ingresa aquí! ' + url);
        window.open('https://wa.me/?text=' + msg);
    }

    showCopyNotification(): void {
        const message = 'Enlace copiado';
        const action = '';
        this._snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['alert-success']
        });
    }

}
