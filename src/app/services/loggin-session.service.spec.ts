import { TestBed, inject } from '@angular/core/testing';

import { LogginSessionService } from './loggin-session.service';

describe('LogginSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogginSessionService]
    });
  });

  it('should be created', inject([LogginSessionService], (service: LogginSessionService) => {
    expect(service).toBeTruthy();
  }));
});
