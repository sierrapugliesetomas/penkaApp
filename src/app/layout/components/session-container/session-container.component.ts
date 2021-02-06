import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-session-container',
    templateUrl: './session-container.component.html',
    styleUrls: ['./session-container.component.scss']
})
export class SessionContainerComponent implements OnInit {

    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService,
        public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.user = this.firebase.auth().currentUser;
    }

    modalLogin(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '400px',
            height: '300px',
        });
        setTimeout(() => {
            dialogRef.close();
        }, 3000);
    }
}
