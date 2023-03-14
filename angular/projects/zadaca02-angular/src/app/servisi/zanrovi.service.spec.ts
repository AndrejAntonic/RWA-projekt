import { TestBed } from '@angular/core/testing';

import { ZanroviService } from './zanrovi.service';

describe('ZanroviService', () => {
  let service: ZanroviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZanroviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
