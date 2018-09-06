import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingHostRequestViewComponent } from './pending-host-request-view.component';

describe('PendingHostRequestViewComponent', () => {
  let component: PendingHostRequestViewComponent;
  let fixture: ComponentFixture<PendingHostRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingHostRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingHostRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
