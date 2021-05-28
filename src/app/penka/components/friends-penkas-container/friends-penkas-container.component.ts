import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../core/interfaces/user";
import {Subject} from "rxjs";
import {FirebaseApp} from "@angular/fire";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {ParticipantsService} from "../../../core/services/participants.service";
import {takeUntil} from "rxjs/operators";
import { Penka } from 'src/app/core/interfaces/penka';

@Component({
    selector: 'app-friends-penkas-container',
    templateUrl: './friends-penkas-container.component.html',
    styleUrls: ['./friends-penkas-container.component.scss']
})
export class FriendsPenkasContainerComponent implements OnInit, OnDestroy {
    @Input() penkas: Penka[];
    user = {} as User;
    myParticipants = [];
    participants = [];
    filterParticipants = [];
    private unsubscribe$ = new Subject<void>();

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        private router: Router,
        private participantsService: ParticipantsService) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
        this.participantsService.getParticipantByUserId(this.user.uid)
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.myParticipants = res;
            });
        this.participantsService.getParticipantsPublic()
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
            res => {
                this.participants = res;
                this.filterParticipants = this.participants.filter(item => {
                    return item.userId !== this.user.uid;
                });
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.myParticipants.length; i++) {
                    this.filterParticipants = this.filterParticipants.filter(item => {
                        return item.codePenka !== this.myParticipants[i].codePenka;
                    });
                }
                // Active limitDate penkas from parent component
                if(this.penkas.length > 0) {
                    const activePenkasIds = this.penkas.map(penka => penka.codePenka);
                    this.filterParticipants = this.filterParticipants.filter(part => activePenkasIds.includes(part.codePenka))
                } else {
                    // there are no active penkas to show
                    this.filterParticipants = [];
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
