import { TestBed, inject } from '@angular/core/testing';

import { GetCatIdFromNameService } from './get-cat-id-from-name.service';

describe('GetCatIdFromNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCatIdFromNameService]
    });
  });

  it('should be created', inject([GetCatIdFromNameService], (service: GetCatIdFromNameService) => {
    expect(service).toBeTruthy();
  }));
});
