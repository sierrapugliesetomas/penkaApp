import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatchesDoneComponent } from './list-matches-done.component';

describe('ListMatchesDoneComponent', () => {
  let component: ListMatchesDoneComponent;
  let fixture: ComponentFixture<ListMatchesDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMatchesDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMatchesDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
