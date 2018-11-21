import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ChangePasswordComponent,
    MyProfileComponent
  ],
  exports: [
    ChangePasswordComponent,
    MyProfileComponent
  ]
})
export class ProfileModule { }
