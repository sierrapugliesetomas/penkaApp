import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaDashboardMiniComponent } from './penka-dashboard-mini.component';

describe('PenkaDashboardMiniComponent', () => {
  let component: PenkaDashboardMiniComponent;
  let fixture: ComponentFixture<PenkaDashboardMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaDashboardMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaDashboardMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
