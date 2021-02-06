import {Component, Input, OnInit} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {GambleService} from '../../../core/services/gamble.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-penka-match-gamble',
  templateUrl: './penka-match-gamble.component.html',
  styleUrls: ['./penka-match-gamble.component.scss']
})
export class PenkaMatchGambleComponent implements OnInit {
  mediumGamble: string; /* medium gamble from radio buttons */
  checked: true;

  @Input() match;
  save: string;

  newGamble = {} as Gamble;
  user = {} as User;

  constructor(
      public firebase: FirebaseApp,
      public auth: AuthService,
      private router: Router,
      private gambleService: GambleService,
      private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = this.firebase.auth().currentUser;
  }

  /* For Penka PRO */
  homeTeam(event, match): void {
    this.gambleService.editGambleHomeScore(match.id, event.value);
  }

  visitTeam(event, match): void {
    this.gambleService.editGambleVisitScore(match.id, event.value);
  }

  saveGamblePro(match): void {
    let winnerId: string;
    let draw: boolean;
    if (match.homeTeamScore > match.visitTeamScore) {
      winnerId = match.homeTeamId;
      draw = false;
    }
    if (match.visitTeamScore > match.homeTeamScore) {
      winnerId = match.visitTeamId;
      draw = false;
    }
    if (match.homeTeamScore === match.visitTeamScore) {
      winnerId = '';
      draw = true;
    }
    const message = 'Jugada guardada';
    const action = '';
    this.gambleService.updateGamble(match.id, winnerId, draw);
    this.newGamble = {} as Gamble;
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['alert-success']
    });
  }

  getGambleMedium(): void {
    if (this.mediumGamble === 'draw') {
      this.newGamble.draw = true;
      this.newGamble.winnerTeamId = '';
    } else {
      this.newGamble.draw = false;
      this.newGamble.winnerTeamId = this.mediumGamble;
    }
  }

  enableGamble(matchId): void {
    this.gambleService.enableGamble(matchId);
  }

  saveGambleMedium(match): void {
    if (this.mediumGamble) {
      this.gambleService.updateGambleMedium(match.id, this.newGamble.winnerTeamId, this.newGamble.draw);
      this.newGamble = {} as Gamble;
      const message = 'Jugada guardada';
      const action = '';
      this._snackBar.open(message, action, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['alert-success']
      });
    } else {
      const message = 'Debe seleccionar un resultado';
      const action = '';
      this._snackBar.open(message, action, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['alert-danger']
      });
    }
  }
}
