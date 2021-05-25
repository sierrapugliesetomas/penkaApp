import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PenkasService } from '../../../core/services/penkas.service';
import { Subject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/interfaces/user';
import { takeUntil } from 'rxjs/operators';
import { ListMatchesService } from '../../../core/services/list-matches.service';
import { Penka } from 'src/app/core/interfaces/penka';

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
  private unsubscribe$ = new Subject<void>();

  constructor(
    public firebase: FirebaseApp,
    public auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private penkasService: PenkasService,
    private listMatchesService: ListMatchesService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getCodePenka();
    this.getPenka();
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
    if(this.penka.codeTemplate !== '') {
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



  join(): void {}
}
