/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaffMemberService } from './userMember.service';

describe('Service: Staff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffMemberService]
    });
  });

  it('should ...', inject([StaffMemberService], (service: StaffMemberService) => {
    expect(service).toBeTruthy();
  }));
});
