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
    finishedOrDueGambles = [];
    openGambles = [];
    participants = [];
    user = {} as User;
    newGamble = {} as Gamble;
    hasOpenGambles: boolean;
    today: Date;
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
        this.today = new Date();
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
                    const gambles = res.filter(c => (c.codePenka === this.codePenka)); 
                    // open gambles
                    this.openGambles = gambles.filter(g => g.status === '1' && g.limitDate.toDate() > this.today);
                    this.hasOpenGambles = this.openGambles.length > 0;

                    // finished or limit date past gambles
                    this.finishedOrDueGambles = gambles.filter(g => g.status === '2' || g.limitDate.toDate() < this.today);
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
	    window.open('https://web.whatsapp.com/send?text=' + msg);
    }

    // shareByMessenger(codePenka): void {}
}
