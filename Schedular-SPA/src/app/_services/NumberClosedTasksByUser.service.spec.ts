/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NumberClosedTasksByUserService } from './NumberClosedTasksByUser.service';

describe('Service: NumberClosedTasksByUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberClosedTasksByUserService]
    });
  });

  it('should ...', inject([NumberClosedTasksByUserService], (service: NumberClosedTasksByUserService) => {
    expect(service).toBeTruthy();
  }));
});
