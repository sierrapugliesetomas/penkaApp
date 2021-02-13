import { TestBed } from '@angular/core/testing';

import { CodePenkaService } from './code-penka.service';

describe('CodePenkaService', () => {
  let service: CodePenkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePenkaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
