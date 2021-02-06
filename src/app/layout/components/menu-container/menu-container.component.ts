import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent implements OnInit {
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService) {
        this.user = this.firebase.auth().currentUser;
    }

    ngOnInit(): void {
    }
}
