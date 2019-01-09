import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectListViewComponent } from './suspect-list-view.component';

describe('SuspectListViewComponent', () => {
  let component: SuspectListViewComponent;
  let fixture: ComponentFixture<SuspectListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
