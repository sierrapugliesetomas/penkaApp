import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PenkasService} from '../../../core/services/penkas.service';
import {Subject} from 'rxjs';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {takeUntil} from 'rxjs/operators';
import {ListMatchesService} from '../../../core/services/list-matches.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
    penkaId: string;
    penka;
    user = {} as User;
    listMatches = [];
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private penkasService: PenkasService,
        private listMatchesService: ListMatchesService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.penkaId = params.id;
            }
        );
        this.penkasService.getPenkaById(this.penkaId)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                res => {
                    this.penka = res;
                });
        this.listMatchesService.getListMatches()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                res => {
                    this.listMatches = res;
                });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    join(): void {

    }
}
