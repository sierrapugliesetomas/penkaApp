import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenkaPopComponent } from './penka-pop.component';

describe('PenkaPopComponent', () => {
  let component: PenkaPopComponent;
  let fixture: ComponentFixture<PenkaPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenkaPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenkaPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
