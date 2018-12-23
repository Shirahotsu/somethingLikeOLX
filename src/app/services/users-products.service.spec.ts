import { TestBed, inject } from '@angular/core/testing';

import { UsersProductsService } from './users-products.service';

describe('UsersProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersProductsService]
    });
  });

  it('should be created', inject([UsersProductsService], (service: UsersProductsService) => {
    expect(service).toBeTruthy();
  }));
});
