/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StateStorageService } from './stateStorage.service';

describe('Service: StateStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateStorageService]
    });
  });

  it('should ...', inject([StateStorageService], (service: StateStorageService) => {
    expect(service).toBeTruthy();
  }));
});
