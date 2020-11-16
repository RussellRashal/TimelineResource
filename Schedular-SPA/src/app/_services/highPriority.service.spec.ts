/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HighPriorityService } from './highPriority.service';

describe('Service: HighPriority', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighPriorityService]
    });
  });

  it('should ...', inject([HighPriorityService], (service: HighPriorityService) => {
    expect(service).toBeTruthy();
  }));
});
