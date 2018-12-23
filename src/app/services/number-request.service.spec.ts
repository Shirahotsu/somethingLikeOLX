import { TestBed, inject } from '@angular/core/testing';

import { NumberRequestService } from './number-request.service';

describe('NumberRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberRequestService]
    });
  });

  it('should be created', inject([NumberRequestService], (service: NumberRequestService) => {
    expect(service).toBeTruthy();
  }));
});
