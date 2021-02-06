import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaMatchComponent } from './penka-match.component';

describe('PenkaMatchComponent', () => {
  let component: PenkaMatchComponent;
  let fixture: ComponentFixture<PenkaMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
