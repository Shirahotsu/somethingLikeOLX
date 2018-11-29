import { TestBed, inject } from '@angular/core/testing';

import { InfoModalService } from './info-modal.service';

describe('InfoModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoModalService]
    });
  });

  it('should be created', inject([InfoModalService], (service: InfoModalService) => {
    expect(service).toBeTruthy();
  }));
});
