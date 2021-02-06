import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatchesWaitComponent } from './list-matches-wait.component';

describe('ListMatchesWaitComponent', () => {
  let component: ListMatchesWaitComponent;
  let fixture: ComponentFixture<ListMatchesWaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMatchesWaitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMatchesWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
