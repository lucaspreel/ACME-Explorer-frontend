import { TestBed } from '@angular/core/testing';

import { SponsorshipService } from './sponsorship.service';

describe('SponsorshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SponsorshipService = TestBed.get(SponsorshipService);
    expect(service).toBeTruthy();
  });
});
