import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMiniCounterComponent } from './match-mini-counter.component';

describe('MatchMiniCounterComponent', () => {
  let component: MatchMiniCounterComponent;
  let fixture: ComponentFixture<MatchMiniCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchMiniCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchMiniCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
