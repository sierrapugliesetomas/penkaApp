import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaMatchGambleResultsComponent } from './penka-match-gamble-results.component';

describe('PenkaMatchGambleResultsComponent', () => {
  let component: PenkaMatchGambleResultsComponent;
  let fixture: ComponentFixture<PenkaMatchGambleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaMatchGambleResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaMatchGambleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
