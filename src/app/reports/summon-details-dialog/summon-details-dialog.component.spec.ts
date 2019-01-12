import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonDetailsDialogComponent } from './summon-details-dialog.component';

describe('SummonDetailsDialogComponent', () => {
  let component: SummonDetailsDialogComponent;
  let fixture: ComponentFixture<SummonDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummonDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
