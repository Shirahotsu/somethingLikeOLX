import { TestBed, inject } from '@angular/core/testing';

import { RecemoendedCategoriesService } from './recemoended-categories.service';

describe('RecemoendedCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecemoendedCategoriesService]
    });
  });

  it('should be created', inject([RecemoendedCategoriesService], (service: RecemoendedCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
