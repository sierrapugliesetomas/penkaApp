import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkasComponent } from './penkas.component';

describe('PenkasComponent', () => {
  let component: PenkasComponent;
  let fixture: ComponentFixture<PenkasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
