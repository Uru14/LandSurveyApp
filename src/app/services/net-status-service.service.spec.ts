import { TestBed } from '@angular/core/testing';

import { NetStatusServiceService } from './net-status.service';

describe('NetStatusServiceService', () => {
  let service: NetStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
