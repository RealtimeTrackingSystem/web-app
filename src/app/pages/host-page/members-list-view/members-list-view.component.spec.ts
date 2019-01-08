import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersListViewComponent } from './members-list-view.component';

describe('MembersListViewComponent', () => {
  let component: MembersListViewComponent;
  let fixture: ComponentFixture<MembersListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
