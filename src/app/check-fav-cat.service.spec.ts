import { TestBed, inject } from '@angular/core/testing';

import { CheckFavCatService } from './services/check-fav-cat.service';

describe('CheckFavCatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFavCatService]
    });
  });

  it('should be created', inject([CheckFavCatService], (service: CheckFavCatService) => {
    expect(service).toBeTruthy();
  }));
});
