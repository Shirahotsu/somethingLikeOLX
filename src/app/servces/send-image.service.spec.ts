import { TestBed, inject } from '@angular/core/testing';

import { SendImageService } from './send-image.service';

describe('SendImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendImageService]
    });
  });

  it('should be created', inject([SendImageService], (service: SendImageService) => {
    expect(service).toBeTruthy();
  }));
});
