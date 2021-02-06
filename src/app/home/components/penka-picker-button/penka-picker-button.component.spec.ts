import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaPickerButtonComponent } from './penka-picker-button.component';

describe('PenkaPickerButtonComponent', () => {
  let component: PenkaPickerButtonComponent;
  let fixture: ComponentFixture<PenkaPickerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaPickerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaPickerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
