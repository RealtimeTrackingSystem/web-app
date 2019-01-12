import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSummonDialogComponent } from './add-summon-dialog.component';

describe('AddSummonDialogComponent', () => {
  let component: AddSummonDialogComponent;
  let fixture: ComponentFixture<AddSummonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSummonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSummonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
