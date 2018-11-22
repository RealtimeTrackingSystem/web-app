import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddProfilePictureDialogComponent } from './add-profile-picture-dialog/add-profile-picture-dialog.component';
import { ComponentModule } from '../components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule
  ],
  declarations: [
    ChangePasswordComponent,
    MyProfileComponent,
    AddProfilePictureDialogComponent
  ],
  exports: [
    ChangePasswordComponent,
    MyProfileComponent,
    AddProfilePictureDialogComponent
  ],
  entryComponents: [
    AddProfilePictureDialogComponent
  ]
})
export class ProfileModule { }
