import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportersTableComponent } from './reporters-table.component';

describe('ReportersTableComponent', () => {
  let component: ReportersTableComponent;
  let fixture: ComponentFixture<ReportersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
