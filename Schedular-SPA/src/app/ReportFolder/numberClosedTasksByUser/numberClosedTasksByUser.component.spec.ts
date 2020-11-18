/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NumberClosedTasksByUserComponent } from './numberClosedTasksByUser.component';

describe('NumberClosedTasksByUserComponent', () => {
  let component: NumberClosedTasksByUserComponent;
  let fixture: ComponentFixture<NumberClosedTasksByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberClosedTasksByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberClosedTasksByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
