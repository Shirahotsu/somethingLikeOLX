import { TestBed, inject } from '@angular/core/testing';

import { SingleProductService } from './single-product.service';

describe('SingleProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleProductService]
    });
  });

  it('should be created', inject([SingleProductService], (service: SingleProductService) => {
    expect(service).toBeTruthy();
  }));
});
