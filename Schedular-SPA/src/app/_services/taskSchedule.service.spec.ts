/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskScheduleService } from './taskSchedule.service';

describe('Service: TaskSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskScheduleService]
    });
  });

  it('should ...', inject([TaskScheduleService], (service: TaskScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
