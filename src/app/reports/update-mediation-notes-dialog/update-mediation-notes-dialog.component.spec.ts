import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMediationNotesDialogComponent } from './update-mediation-notes-dialog.component';

describe('UpdateMediationNotesDialogComponent', () => {
  let component: UpdateMediationNotesDialogComponent;
  let fixture: ComponentFixture<UpdateMediationNotesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMediationNotesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMediationNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
