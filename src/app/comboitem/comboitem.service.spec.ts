import { TestBed, inject } from '@angular/core/testing';

import { ComboitemService } from './comboitem.service';

describe('ComboitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComboitemService]
    });
  });

  it('should be created', inject([ComboitemService], (service: ComboitemService) => {
    expect(service).toBeTruthy();
  }));
});
