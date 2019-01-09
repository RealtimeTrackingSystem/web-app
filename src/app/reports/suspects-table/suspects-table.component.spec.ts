import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectsTableComponent } from './suspects-table.component';

describe('SuspectsTableComponent', () => {
  let component: SuspectsTableComponent;
  let fixture: ComponentFixture<SuspectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
