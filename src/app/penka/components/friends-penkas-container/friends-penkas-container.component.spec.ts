import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPenkasContainerComponent } from './friends-penkas-container.component';

describe('FriendsPenkasContainerComponent', () => {
  let component: FriendsPenkasContainerComponent;
  let fixture: ComponentFixture<FriendsPenkasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsPenkasContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPenkasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
