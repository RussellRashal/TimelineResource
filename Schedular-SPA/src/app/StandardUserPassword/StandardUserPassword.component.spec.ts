/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StandardUserPasswordComponent } from './StandardUserPassword.component';

describe('StandardUserPasswordComponent', () => {
  let component: StandardUserPasswordComponent;
  let fixture: ComponentFixture<StandardUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardUserPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
