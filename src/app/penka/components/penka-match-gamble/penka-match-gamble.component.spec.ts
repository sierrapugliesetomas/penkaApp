import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaMatchGambleComponent } from './penka-match-gamble.component';

describe('PenkaMatchGambleComponent', () => {
  let component: PenkaMatchGambleComponent;
  let fixture: ComponentFixture<PenkaMatchGambleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaMatchGambleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaMatchGambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
