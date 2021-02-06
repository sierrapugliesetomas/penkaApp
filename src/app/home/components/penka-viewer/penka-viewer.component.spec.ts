import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaViewerComponent } from './penka-viewer.component';

describe('PenkaViewerComponent', () => {
  let component: PenkaViewerComponent;
  let fixture: ComponentFixture<PenkaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
