import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchMiniComponent} from './match-mini.component';

describe('MatchMiniComponent', () => {
    let component: MatchMiniComponent;
    let fixture: ComponentFixture<MatchMiniComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatchMiniComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchMiniComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
