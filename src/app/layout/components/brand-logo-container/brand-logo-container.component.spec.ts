import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLogoContainerComponent } from './brand-logo-container.component';

describe('BrandLogoContainerComponent', () => {
  let component: BrandLogoContainerComponent;
  let fixture: ComponentFixture<BrandLogoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandLogoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandLogoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
