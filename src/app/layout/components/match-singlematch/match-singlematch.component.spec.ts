import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchSinglematchComponent} from './match-singlematch.component';

describe('MatchSinglematchComponent', () => {
    let component: MatchSinglematchComponent;
    let fixture: ComponentFixture<MatchSinglematchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatchSinglematchComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchSinglematchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
