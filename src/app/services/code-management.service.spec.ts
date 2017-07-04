import { TestBed, inject } from '@angular/core/testing';

import { CodeManagementService } from './code-management.service';

describe('CodeManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeManagementService]
    });
  });

  it('should be created', inject([CodeManagementService], (service: CodeManagementService) => {
    expect(service).toBeTruthy();
  }));
});
