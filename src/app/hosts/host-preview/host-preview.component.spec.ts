import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPreviewComponent } from './host-preview.component';

describe('HostPreviewComponent', () => {
  let component: HostPreviewComponent;
  let fixture: ComponentFixture<HostPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
