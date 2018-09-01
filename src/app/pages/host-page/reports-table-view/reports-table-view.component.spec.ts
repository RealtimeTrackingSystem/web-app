import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTableViewComponent } from './reports-table-view.component';

describe('ReportsTableViewComponent', () => {
  let component: ReportsTableViewComponent;
  let fixture: ComponentFixture<ReportsTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
