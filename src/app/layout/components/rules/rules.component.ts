import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  title = 'Reglamento';
  estilo: string;
  mediumValue = true;
  proValue = false;
  juniorValue = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  junior(): void {
    this.juniorValue = true;
    this.mediumValue = false;
    this.proValue = false;

  }

  medium() {
    this.juniorValue = false;
    this.mediumValue = true;
    this.proValue = false;
  }

  pro() {
    this.juniorValue = false;
    this.mediumValue = false;
    this.proValue = true;
  }

}
