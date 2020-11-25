import {TestBed} from '@angular/core/testing';

import {PenkaRequestService} from './penka-request.service';

describe('PenkaRequestService', () => {
    let service: PenkaRequestService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PenkaRequestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
