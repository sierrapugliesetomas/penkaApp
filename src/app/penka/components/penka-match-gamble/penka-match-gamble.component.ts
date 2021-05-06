import {Component, Input, OnInit} from '@angular/core';
import {Gamble} from '../../../core/interfaces/gamble';
import {User} from '../../../core/interfaces/user';
import {FirebaseApp} from '@angular/fire';
import {AuthService} from '../../../core/services/auth.service';
import {GambleService} from '../../../core/services/gamble.service';
import { SingleMatch } from 'src/app/core/interfaces/single-match';
import { SingleMatchesService } from 'src/app/core/services/single-matches.service';
import { take } from 'rxjs/operators';

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
  singleMatch: SingleMatch;

  newGamble = {} as Gamble;
  user = {} as User;

  constructor(
    public firebase: FirebaseApp,
    public auth: AuthService,
    private singleMatchService: SingleMatchesService) {
  }

  ngOnInit(): void {
    this.user = this.firebase.auth().currentUser;
    if (this.match.penkaFormat === 'MEDIUM') {
      this.setDefaultRadioButtonValue();
    }

    this.singleMatchService.getMatchById(this.match.singleMatchId)
    .pipe(take(1))
    .subscribe(res => {
      this.singleMatch = res;
    })
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
    this.match.homeTeamScore = Number(event.value);
  }

  visitTeam(event): void {
    this.match.visitTeamScore = Number(event.value);
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
}
