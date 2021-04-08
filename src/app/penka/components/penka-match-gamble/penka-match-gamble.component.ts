import { Component, Input, OnInit } from '@angular/core';
import { Gamble } from '../../../core/interfaces/gamble';
import { User } from '../../../core/interfaces/user';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { GambleService } from '../../../core/services/gamble.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-penka-match-gamble',
  templateUrl: './penka-match-gamble.component.html',
  styleUrls: ['./penka-match-gamble.component.scss']
})
export class PenkaMatchGambleComponent implements OnInit {
  mediumGamble: string; /* medium gamble from radio buttons */
  checked: true;

  @Input() match: Gamble;
  save: string;

  newGamble = {} as Gamble;
  user = {} as User;

  constructor(
    public firebase: FirebaseApp,
    public auth: AuthService,
    private gambleService: GambleService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = this.firebase.auth().currentUser;
    if (this.match.penkaFormat === 'MEDIUM') {
      this.setDefaultRadioButtonValue();
    }
  }

  private setDefaultRadioButtonValue(): void {
    if (this.match.winnerTeamId === this.match.homeTeamId) {
      this.mediumGamble = this.match.homeTeamId;
    } else if (this.match.winnerTeamId === this.match.visitTeamId) {
      this.mediumGamble = this.match.visitTeamId;
    } else {
      this.mediumGamble = 'draw';
    }
  }

  /* For Penka PRO */
  homeTeam(event): void {
    this.match.homeTeamScore = event.value;
  }

  visitTeam(event): void {
    this.match.visitTeamScore = event.value;
  }

  editGambleScore() {
    this.gambleService.editGambleHomeScore(this.match.id, this.match.homeTeamScore);
    this.gambleService.editGambleVisitScore(this.match.id, this.match.visitTeamScore);
  }

  getGambleMedium(): void {
    if (this.mediumGamble === 'draw') {
      this.match.draw = true;
      this.match.winnerTeamId = '';
    } else {
      this.match.draw = false;
      this.match.winnerTeamId = this.mediumGamble;
    }
  }

  // enableGamble(matchId): void {
  //   this.gambleService.enableGamble(matchId);
  // }

}
