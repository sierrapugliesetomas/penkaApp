import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleMatchesComponent} from './single-matches.component';

describe('SingleMatchesComponent', () => {
    let component: SingleMatchesComponent;
    let fixture: ComponentFixture<SingleMatchesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleMatchesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleMatchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
