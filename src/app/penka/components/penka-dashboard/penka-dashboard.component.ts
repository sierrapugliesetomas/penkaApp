import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {User} from '../../../core/interfaces/user';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {ParticipantsService} from '../../../core/services/participants.service';
import {GambleService} from '../../../core/services/gamble.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-penka-dashboard',
    templateUrl: './penka-dashboard.component.html',
    styleUrls: ['./penka-dashboard.component.scss']
})
export class PenkaDashboardComponent implements OnInit, OnDestroy {
    codePenka: string;
    penkas = [];
    gambles = [];
    participants = [];
    user = {} as User;
    newGamble = {} as Gamble;
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private participantsService: ParticipantsService,
        private gambleService: GambleService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.codePenka = params.codePenka;
            }
        );
        this.gambleService.getGambleByUserId(this.user.uid)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                res => {
                    this.gambles = res;
                });
        this.penkasService.getAllPenkasByCodePenka(this.codePenka)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                res => {
                    this.penkas = res;
                });
        this.participantsService.getParticipantByCodePenka(this.codePenka)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                res => {
                    this.participants = res;
                });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    goGrid(codePenka): any {
        this.router.navigate(['/penka/grid/' + codePenka]).then();
    }


    playGamble(codePenka): any {
        this.router.navigate(['/penka/gamble/' + codePenka]).then();
    }


    editGamble(codePenka): any {
        this.router.navigate(['/penka/gambleEdit/' + codePenka]).then();
    }

    finishPenka(penkaId): any {
        if (confirm('Desea Finalizar esta Penka?')) {
            this.penkasService.updateStatus(penkaId, '2');
            this.participants.forEach(item => {
                this.participantsService.updateParticipation(item.id, '2');
            });
        }
    }

    toFile(penkaId): any {
        if (confirm('Desea Archivar esta Penka?')) {
            this.penkasService.updateStatus(penkaId, '9');
            this.participants.forEach(item => {
                this.participantsService.updateParticipation(item.id, '9');
            });
        }
    }

    shareByWhatsapp(codePenka): void {
        const url = 'https://penkapro.com/penka/join/' + codePenka;
        const msg = encodeURIComponent('Unete a mi Penka, solo ingresa Aqui! ' + url);
	    window.location.href = 'https://web.whatsapp.com/send?text=' + msg;
    }

    shareByMessenger(codePenka): void {

    }
}
