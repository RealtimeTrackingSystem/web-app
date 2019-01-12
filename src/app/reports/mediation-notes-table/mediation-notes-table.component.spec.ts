import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediationNotesTableComponent } from './mediation-notes-table.component';

describe('MediationNotesTableComponent', () => {
  let component: MediationNotesTableComponent;
  let fixture: ComponentFixture<MediationNotesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediationNotesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediationNotesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
