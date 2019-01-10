import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostJoinedViewComponent } from './host-joined-view.component';

describe('HostJoinedViewComponent', () => {
  let component: HostJoinedViewComponent;
  let fixture: ComponentFixture<HostJoinedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostJoinedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostJoinedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
