import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {PenkaRequest} from '../../../core/interfaces/penkaRequest';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {ParticipantsService} from '../../../core/services/participants.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {takeUntil} from 'rxjs/operators';
import {RequestNotificationComponent} from '../../../inbox/components/request-notification/request-notification.component';

@Component({
    selector: 'app-penka',
    templateUrl: './penka.component.html',
    styleUrls: ['./penka.component.scss']
})
export class PenkaComponent implements OnInit, OnDestroy {
    @Input() codePenka: string;
    listMatches = [];
    penka = [];
    user = {} as User;
    newPenkaRequest = {} as PenkaRequest;
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private penkasService: PenkasService,
        private listMatchesService: ListMatchesService,
        private penkasRequestService: PenkaRequestService,
        private participantsService: ParticipantsService,
        // tslint:disable-next-line:variable-name
        private _snackBar: MatSnackBar) {
        this.user = this.firebase.auth().currentUser;
    }

    ngOnInit(): void {
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penka = res;
            });
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

    goWatch(codePenka): void {
        this.router.navigate(['/penka/dashboard/' + codePenka]).catch();
    }

    join(penkaId, userId, codePenka, penkaName, makerId, makerName, makerEmail, makerPhoto): void {

        let ifExist = [];
        const today = new Date();
        let counter = 1;

        if (confirm('Deseas unirte a la penka: ' + penkaName)) {

            this.penkasRequestService.getPenkaByUserAndCodePenka(userId, codePenka).subscribe(
                res => {
                    ifExist = res;
                    if (ifExist.length > 0) {
                        if (counter === 1) {
                            alert('Ya has enviado una solicitud de union a la Penka: "penkaName"');
                            counter++;
                        }
                    } else {
                        if (counter === 1) {
                            this.newPenkaRequest.penkaId = penkaId;
                            this.newPenkaRequest.codePenka = codePenka;
                            this.newPenkaRequest.makerId = makerId;
                            this.newPenkaRequest.makerName = makerName;
                            this.newPenkaRequest.makerEmail = makerEmail;
                            this.newPenkaRequest.makerPhoto = makerPhoto;
                            this.newPenkaRequest.userId = this.user.uid;
                            this.newPenkaRequest.userName = this.user.displayName;
                            this.newPenkaRequest.userEmail = this.user.email;
                            this.newPenkaRequest.userPhoto = this.user.photoURL;
                            this.newPenkaRequest.date = today;
                            this.newPenkaRequest.status = '1';
                            this.penkasRequestService.addPenkaRequest(this.newPenkaRequest);

                            this._snackBar.openFromComponent(RequestNotificationComponent, {
                                duration: 3000,
                                horizontalPosition: 'end',
                                verticalPosition: 'top',
                                panelClass: 'request-notification'
                            });
                            counter++;
                        }
                    }
                },
                error => console.log(error));
        }
    }

}
