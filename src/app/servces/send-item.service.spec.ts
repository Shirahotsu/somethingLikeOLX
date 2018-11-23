import { TestBed, inject } from '@angular/core/testing';

import { SendItemService } from './send-item.service';

describe('SendItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendItemService]
    });
  });

  it('should be created', inject([SendItemService], (service: SendItemService) => {
    expect(service).toBeTruthy();
  }));
});
