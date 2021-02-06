import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryBannersComponent } from './secondary-banners.component';

describe('SecondaryBannersComponent', () => {
  let component: SecondaryBannersComponent;
  let fixture: ComponentFixture<SecondaryBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
