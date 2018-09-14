import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReportViewComponent } from './new-report-view.component';

describe('NewReportViewComponent', () => {
  let component: NewReportViewComponent;
  let fixture: ComponentFixture<NewReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
