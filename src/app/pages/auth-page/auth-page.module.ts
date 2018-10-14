import { MaterialModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterModule } from '../../shared/footer/footer.module';
import { AuthPageRoutes } from './auth-page.routing';
import { LoginComponent } from './login/login.component';

import { ComponentModule } from '../../components/component.module';
import { RegisterComponent } from './register/register.component';
import { SpinnerComponent, DirectiveModule } from '../../directives';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthPageRoutes),
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    ComponentModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})

export class AuthPageModule {}
