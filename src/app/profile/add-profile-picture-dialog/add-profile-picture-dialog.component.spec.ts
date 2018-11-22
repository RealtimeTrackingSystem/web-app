import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilePictureDialogComponent } from './add-profile-picture-dialog.component';

describe('AddProfilePictureDialogComponent', () => {
  let component: AddProfilePictureDialogComponent;
  let fixture: ComponentFixture<AddProfilePictureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfilePictureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfilePictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
