import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackSpaceComponent} from './back-space.component';

describe('BackSpaceComponent', () => {
    let component: BackSpaceComponent;
    let fixture: ComponentFixture<BackSpaceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BackSpaceComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BackSpaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
