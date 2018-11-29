import { TestBed, inject } from '@angular/core/testing';

import { AddItemInfoService } from './add-item-info.service';

describe('AddItemInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddItemInfoService]
    });
  });

  it('should be created', inject([AddItemInfoService], (service: AddItemInfoService) => {
    expect(service).toBeTruthy();
  }));
});
