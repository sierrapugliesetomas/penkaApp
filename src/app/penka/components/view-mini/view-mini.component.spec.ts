import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMiniComponent } from './view-mini.component';

describe('ViewMiniComponent', () => {
  let component: ViewMiniComponent;
  let fixture: ComponentFixture<ViewMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
