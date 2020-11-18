import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BarButtonMobileComponent} from './bar-button-mobile.component';

describe('BarButtonMobileComponent', () => {
    let component: BarButtonMobileComponent;
    let fixture: ComponentFixture<BarButtonMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BarButtonMobileComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BarButtonMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
