import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchMiniGambleComponent} from './match-mini-gamble.component';

describe('MatchMiniGambleComponent', () => {
    let component: MatchMiniGambleComponent;
    let fixture: ComponentFixture<MatchMiniGambleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatchMiniGambleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchMiniGambleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
