import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchGambleComponent } from './match-gamble.component';

describe('MatchGambleComponent', () => {
  let component: MatchGambleComponent;
  let fixture: ComponentFixture<MatchGambleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchGambleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchGambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
