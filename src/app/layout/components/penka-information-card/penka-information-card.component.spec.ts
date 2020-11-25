import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PenkaInformationCardComponent} from './penka-information-card.component';

describe('PenkaInformationCardComponent', () => {
    let component: PenkaInformationCardComponent;
    let fixture: ComponentFixture<PenkaInformationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PenkaInformationCardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PenkaInformationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
