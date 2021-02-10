import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMiniContainerComponent } from './match-mini-container.component';

describe('MatchMiniContainerComponent', () => {
  let component: MatchMiniContainerComponent;
  let fixture: ComponentFixture<MatchMiniContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchMiniContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchMiniContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
