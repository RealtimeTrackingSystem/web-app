import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../app.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { InputBasicComponent } from './input/basic/input-basic.component';
import { TableBasicComponent } from './table/basic/table-basic.component';
import { FileUploadBasicComponent } from './fileUpload/basic/fileUpload-basic.component';
import { SpinnerComponent, DirectiveModule } from '../directives';
import { ModalBasicComponentComponent } from './modal/modal-basic/modal-basic-component.component';
import { MediaViewerV1Component } from './media-viewer/media-viewerV1/media-viewer-v1.component'
import { PipeModule } from './../pipes';
import { FileUploadWithFormComponent } from './fileUpload/form/file-upload-with-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    NgxGalleryModule,
    DirectiveModule,
    PipeModule
  ],
  exports: [
    InputBasicComponent,
    TableBasicComponent,
    FileUploadBasicComponent,
    MediaViewerV1Component,
    FileUploadWithFormComponent
  ],
  declarations: [
    InputBasicComponent,
    TableBasicComponent,
    FileUploadBasicComponent,
    ModalBasicComponentComponent,
    MediaViewerV1Component,
    FileUploadWithFormComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class ComponentModule {
}
