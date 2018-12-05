import { TestBed, inject } from '@angular/core/testing';

import { NewestProductsService } from './newest-products.service';

describe('NewestProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewestProductsService]
    });
  });

  it('should be created', inject([NewestProductsService], (service: NewestProductsService) => {
    expect(service).toBeTruthy();
  }));
});
