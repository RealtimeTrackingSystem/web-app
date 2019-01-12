import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendClearanceDialogComponent } from './send-clearance-dialog.component';

describe('SendClearanceDialogComponent', () => {
  let component: SendClearanceDialogComponent;
  let fixture: ComponentFixture<SendClearanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendClearanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendClearanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
