import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDuplicateDialogComponent } from './set-duplicate-dialog.component';

describe('SetDuplicateDialogComponent', () => {
  let component: SetDuplicateDialogComponent;
  let fixture: ComponentFixture<SetDuplicateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDuplicateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDuplicateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
