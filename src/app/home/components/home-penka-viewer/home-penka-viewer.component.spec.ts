import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePenkaViewerComponent} from './home-penka-viewer.component';

describe('HomePenkaViewerComponent', () => {
    let component: HomePenkaViewerComponent;
    let fixture: ComponentFixture<HomePenkaViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomePenkaViewerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePenkaViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
