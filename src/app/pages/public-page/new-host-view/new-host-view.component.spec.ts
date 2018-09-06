import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHostViewComponent } from './new-host-view.component';

describe('NewHostViewComponent', () => {
  let component: NewHostViewComponent;
  let fixture: ComponentFixture<NewHostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
