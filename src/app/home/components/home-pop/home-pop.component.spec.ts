import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePopComponent} from './home-pop.component';

describe('HomePopComponent', () => {
    let component: HomePopComponent;
    let fixture: ComponentFixture<HomePopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomePopComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
