import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeSingleMatchesComponent} from './home-single-matches.component';

describe('HomeSingleMatchesComponent', () => {
    let component: HomeSingleMatchesComponent;
    let fixture: ComponentFixture<HomeSingleMatchesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeSingleMatchesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeSingleMatchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
