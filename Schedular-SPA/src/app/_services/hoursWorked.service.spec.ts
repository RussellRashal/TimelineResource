/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HoursWorkedService } from './hoursWorked.service';

describe('Service: HoursWorked', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoursWorkedService]
    });
  });

  it('should ...', inject([HoursWorkedService], (service: HoursWorkedService) => {
    expect(service).toBeTruthy();
  }));
});
