import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FirebaseApp} from '@angular/fire';
import {User} from '../../../core/interfaces/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user = {} as User;

    constructor(
        public firebase: FirebaseApp,
        public auth: AuthService) {
        this.user = this.firebase.auth().currentUser;
    }

    ngOnInit(): void {
    }
}
