import { ReportersTableComponent } from './reporters-table/reporters-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ReportersTableComponent
  ],
  exports: [
    ReportersTableComponent
  ]
})

export class ReportersModule {}
