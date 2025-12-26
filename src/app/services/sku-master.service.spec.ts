import { TestBed } from '@angular/core/testing';

import { SkuMasterService } from './sku-master.service';

describe('SkuMasterService', () => {
  let service: SkuMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkuMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
