import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPromiseComponent } from './test-promise.component';

describe('TestPromiseComponent', () => {
  let component: TestPromiseComponent;
  let fixture: ComponentFixture<TestPromiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPromiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
