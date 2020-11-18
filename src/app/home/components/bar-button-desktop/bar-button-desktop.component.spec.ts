import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BarButtonDesktopComponent} from './bar-button-desktop.component';

describe('BarButtonDesktopComponent', () => {
    let component: BarButtonDesktopComponent;
    let fixture: ComponentFixture<BarButtonDesktopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BarButtonDesktopComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BarButtonDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
