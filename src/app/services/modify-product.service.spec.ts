import { TestBed, inject } from '@angular/core/testing';

import { ModifyProductService } from './modify-product.service';

describe('ModifyProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyProductService]
    });
  });

  it('should be created', inject([ModifyProductService], (service: ModifyProductService) => {
    expect(service).toBeTruthy();
  }));
});
