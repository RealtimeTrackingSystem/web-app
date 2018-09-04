import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListViewComponent } from './host-list-view.component';

describe('HostListViewComponent', () => {
  let component: HostListViewComponent;
  let fixture: ComponentFixture<HostListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
