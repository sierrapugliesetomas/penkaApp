import {TestBed} from '@angular/core/testing';

import {PenkasService} from './penkas.service';

describe('PenkasService', () => {
    let service: PenkasService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PenkasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
