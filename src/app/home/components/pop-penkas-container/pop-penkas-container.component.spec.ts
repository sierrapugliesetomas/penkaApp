import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopPenkasContainerComponent } from './pop-penkas-container.component';

describe('PopPenkasContainerComponent', () => {
  let component: PopPenkasContainerComponent;
  let fixture: ComponentFixture<PopPenkasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopPenkasContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopPenkasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
