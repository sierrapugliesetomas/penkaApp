import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchesContainerComponent } from './single-matches-container.component';

describe('SingleMatchesContainerComponent', () => {
  let component: SingleMatchesContainerComponent;
  let fixture: ComponentFixture<SingleMatchesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMatchesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
