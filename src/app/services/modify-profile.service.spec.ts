import { TestBed, inject } from '@angular/core/testing';

import { ModifyProfileService } from './modify-profile.service';

describe('ModifyProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyProfileService]
    });
  });

  it('should be created', inject([ModifyProfileService], (service: ModifyProfileService) => {
    expect(service).toBeTruthy();
  }));
});
