import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PenkasService } from '../../../core/services/penkas.service';
import { Subject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/interfaces/user';
import { first, takeUntil } from 'rxjs/operators';
import { ListMatchesService } from '../../../core/services/list-matches.service';
import { Penka } from 'src/app/core/interfaces/penka';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PenkaRequest } from 'src/app/core/interfaces/penkaRequest';
import { PenkaRequestService } from 'src/app/core/services/penka-request.service';
import { RequestNotificationComponent } from 'src/app/inbox/components/request-notification/request-notification.component';
import { ParticipantsService } from 'src/app/core/services/participants.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  penkaId: string;
  penka: Penka;
  user = {} as User;
  listMatches = [];
  newPenkaRequest = {} as PenkaRequest;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public firebase: FirebaseApp,
    public auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private penkasService: PenkasService,
    private listMatchesService: ListMatchesService,
    private penkasRequestService: PenkaRequestService,
    private participantsService: ParticipantsService,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getCodePenka();
    this.checkParticipant();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getUser(): void {
    this.user = this.firebase.auth().currentUser;
  }

  private getCodePenka(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.penkaId = params.codePenka;
    });
  }

  private checkParticipant(): void {
    this.participantsService.getAllParticipantByUserId(this.user.uid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          const participantsId = res.map(p => p.codePenka);
          if (participantsId.includes(this.penkaId)) {
            // user is already playing this penka, redirect to dashboard. /view is only for non participants
            this.router.navigate(['/penka/dashboard/' + this.penkaId], { replaceUrl: true }).catch();
          } else {
            this.getPenka();
          }
        }
      );
  }

  private getPenka(): void {
    this.penkasService
      .getPenkaByCodePenka(this.penkaId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.penka = res[0];
        this.getListMatches();
      });
  }

  private getListMatches(): void {
    if (this.penka.codeTemplate !== '') {
      this.listMatchesService
        .getListMatchesByCodeTemplate(this.penka.codeTemplate)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.listMatches = res;
        });
    } else {
      this.listMatchesService
        .getListMatchesByCodePenka(this.penka.codePenka)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.listMatches = res;
        });
    }
  }

  join(): void {
    let ifExist = [];
    const today = new Date();
    let counter = 1;

    if (confirm('Deseas unirte a la penka: ' + this.penka.name)) {

      this.penkasRequestService.getPenkaByUserAndCodePenka(this.user.uid, this.penka.codePenka)
        .pipe(first())
        .subscribe(
          res => {
            ifExist = res;
            if (ifExist.length > 0) {
              if (counter === 1) {
                alert('Ya has enviado una solicitud de union a la Penka:' + this.penka.name);
                counter++;
              }
            } else {
              if (counter === 1) {
                this.newPenkaRequest.penkaName = this.penka.name;
                this.newPenkaRequest.penkaId = this.penkaId;
                this.newPenkaRequest.codePenka = this.penka.codePenka;
                this.newPenkaRequest.makerId = this.penka.makerId;
                this.newPenkaRequest.makerName = this.penka.makerName;
                this.newPenkaRequest.makerEmail = this.penka.makerEmail;
                this.newPenkaRequest.makerPhoto = this.penka.makerPhoto;
                this.newPenkaRequest.userId = this.user.uid;
                this.newPenkaRequest.userName = this.user.displayName;
                this.newPenkaRequest.userEmail = this.user.email;
                this.newPenkaRequest.userPhoto = this.user.photoURL;
                this.newPenkaRequest.date = today;
                this.newPenkaRequest.status = '1';
                this.newPenkaRequest.timesShow = 0;
                this.penkasRequestService.addPenkaRequest(this.newPenkaRequest);

                this._snackBar.openFromComponent(RequestNotificationComponent, {
                  duration: 5000,
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
