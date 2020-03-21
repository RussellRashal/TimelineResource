/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestTaskComponent } from './TestTask.component';

describe('TestTaskComponent', () => {
  let component: TestTaskComponent;
  let fixture: ComponentFixture<TestTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
