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

  saveGamblePro(match): void {
    // Ya se crean por defecto con un gamble en draw, revisar si puede ser eliminado
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
	
    this.gambleService.updateGamble(match.id, winnerId, draw);
    this.newGamble = {} as Gamble;
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
