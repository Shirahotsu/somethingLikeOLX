import { TestBed, inject } from '@angular/core/testing';

import { MyProductsService } from './my-products.service';

describe('MyProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyProductsService]
    });
  });

  it('should be created', inject([MyProductsService], (service: MyProductsService) => {
    expect(service).toBeTruthy();
  }));
});
