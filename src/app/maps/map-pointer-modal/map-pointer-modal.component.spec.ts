import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPointerModalComponent } from './map-pointer-modal.component';

describe('MapPointerModalComponent', () => {
  let component: MapPointerModalComponent;
  let fixture: ComponentFixture<MapPointerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPointerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPointerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
