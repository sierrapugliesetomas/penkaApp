import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchPickedComponent } from './single-match-picked.component';

describe('SingleMatchPickedComponent', () => {
  let component: SingleMatchPickedComponent;
  let fixture: ComponentFixture<SingleMatchPickedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMatchPickedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchPickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
