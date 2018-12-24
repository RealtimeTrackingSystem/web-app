import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnayliticsComponent } from './anaylitics.component';

describe('AnayliticsComponent', () => {
  let component: AnayliticsComponent;
  let fixture: ComponentFixture<AnayliticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnayliticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnayliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
