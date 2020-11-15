/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerTasksService } from './customerTasks.service';

describe('Service: CustomerTasks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerTasksService]
    });
  });

  it('should ...', inject([CustomerTasksService], (service: CustomerTasksService) => {
    expect(service).toBeTruthy();
  }));
});
