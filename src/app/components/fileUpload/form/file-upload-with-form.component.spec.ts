import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadWithFormComponent } from './file-upload-with-form.component';

describe('FileUploadWithFormComponent', () => {
  let component: FileUploadWithFormComponent;
  let fixture: ComponentFixture<FileUploadWithFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadWithFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadWithFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
