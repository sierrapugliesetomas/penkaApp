import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Penka} from '../../../core/interfaces/penka';
import {ListMatchesService} from '../../../core/services/list-matches.service';
import {Observable, Subject} from 'rxjs';
import {ListMatches} from '../../../core/interfaces/list-matches';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RequestNotificationComponent} from '../../../inbox/components/request-notification/request-notification.component';
import {PenkaRequest} from '../../../core/interfaces/penkaRequest';
import {AuthService} from '../../../core/services/auth.service';
import {FirebaseApp} from '@angular/fire';
import {User} from '../../../core/interfaces/user';
import {PenkaRequestService} from '../../../core/services/penka-request.service';
import {takeUntil} from 'rxjs/operators';
import {PenkasService} from '../../../core/services/penkas.service';

@Component({
    selector: 'app-home-pop',
    templateUrl: './home-pop.component.html',
    styleUrls: ['./home-pop.component.scss']
})
export class HomePopComponent implements OnInit, OnDestroy {

    /* Get codePenka from HomeComponent */
    @Input() codePenka: string;

    /* Array Penka */
    penkas = [] as Penka[];

    /* User Object */
    user = {} as User;

    listMatches$: Observable<ListMatches[]>;
    newPenkaRequest = {} as PenkaRequest;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private penkasService: PenkasService,
        private listMatchesService: ListMatchesService,
        private penkasRequestService: PenkaRequestService,
        // tslint:disable-next-line:variable-name
        private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.listMatches$ = this.listMatchesService.getMatches();

        /* Get Participation */
        this.penkasService.getPenkaByCodePenka(this.codePenka)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.penkas = res;
            });
        /*************************/
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // tslint:disable-next-line:typedef
    join(penkaId, codePenka, penkaName, makerId, makerName, makerEmail, makerPhoto) {

        if (confirm('Deseas unirte a la penka: ' + penkaName)) {

            /* get date */
            const months = ['Jan', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const today = new Date();
            const date = today.getDate() + ' de ' + months[today.getMonth()] + ' de ' + today.getFullYear();

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
            this.newPenkaRequest.date = date;
            this.newPenkaRequest.status = '1';
            this.penkasRequestService.addPenkaRequest(this.newPenkaRequest);


            this._snackBar.openFromComponent(RequestNotificationComponent, {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: 'request-notification'
            });
        }
    }

}
