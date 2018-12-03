import { TestBed, inject } from '@angular/core/testing';

import { CategoryProductsService } from './category-products.service';

describe('CategoryProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryProductsService]
    });
  });

  it('should be created', inject([CategoryProductsService], (service: CategoryProductsService) => {
    expect(service).toBeTruthy();
  }));
});
