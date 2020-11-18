import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSinglematchMiniComponent } from './match-singlematch-mini.component';

describe('MatchSinglematchMiniComponent', () => {
  let component: MatchSinglematchMiniComponent;
  let fixture: ComponentFixture<MatchSinglematchMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchSinglematchMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSinglematchMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
