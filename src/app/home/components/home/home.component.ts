import {Component, OnInit} from '@angular/core';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = {} as User;

  constructor(
    public firebase: FirebaseApp,
    public auth: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.firebase.auth().currentUser;
  }
}
