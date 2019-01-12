import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediationNoteDialogComponent } from './add-mediation-note-dialog.component';

describe('AddMediationNoteDialogComponent', () => {
  let component: AddMediationNoteDialogComponent;
  let fixture: ComponentFixture<AddMediationNoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMediationNoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMediationNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
