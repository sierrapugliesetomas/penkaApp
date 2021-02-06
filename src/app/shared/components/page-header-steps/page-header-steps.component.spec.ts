import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageHeaderStepsComponent} from './page-header-steps.component';

describe('PageHeaderStepsComponent', () => {
    let component: PageHeaderStepsComponent;
    let fixture: ComponentFixture<PageHeaderStepsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PageHeaderStepsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PageHeaderStepsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
