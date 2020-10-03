/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditNameService } from './editName.service';

describe('Service: EditName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditNameService]
    });
  });

  it('should ...', inject([EditNameService], (service: EditNameService) => {
    expect(service).toBeTruthy();
  }));
});
