import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaDashboardComponent } from './penka-dashboard.component';

describe('PenkaDashboardComponent', () => {
  let component: PenkaDashboardComponent;
  let fixture: ComponentFixture<PenkaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
