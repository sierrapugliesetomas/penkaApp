import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaPickerComponent } from './penka-picker.component';

describe('PenkaPickerComponent', () => {
  let component: PenkaPickerComponent;
  let fixture: ComponentFixture<PenkaPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
