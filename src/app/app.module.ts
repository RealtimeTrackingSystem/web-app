import { NgModule, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

/* AGM */
import { AgmCoreModule } from '@agm/core';

/* REDUX */
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { rootReducer, INITIAL_STATE, IAppState } from './store/app.store';
import { ActionCreatorModule } from './store/action-creators/action-creator.module';

import { AppComponent } from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedpluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { HostLayoutComponent } from './layouts/host/host-layout.component';
import { PublicLayoutComponent } from './layouts/public/public-layout.component';

import { AppRoutes } from './app.routing';
import { ServiceModule } from 'app/services';

/* Routing Guards */
import { AdminGuard, SessionGuard, HostGuard, CanDeactivateGuard } from './guards';
import { TranslationPipe } from './pipes/translation.pipe';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        NgReduxModule,
        NgReduxRouterModule,
        ActionCreatorModule.forRoot(),
        ServiceModule.forRoot(),
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        MaterialModule,
        MatNativeDateModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedpluginModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBmbRGliVKKLtrHUGQYRC2XrRqWgrX3Iqs'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        HostLayoutComponent,
        PublicLayoutComponent
    ],
    bootstrap:    [ AppComponent ],
    providers: [
      SessionGuard,
      AdminGuard,
      HostGuard,
      CanDeactivateGuard
    ]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {
    if (isDevMode()) {
      const enhancers = [devTools.enhancer()];
      ngRedux.configureStore( rootReducer, INITIAL_STATE, [], enhancers );
    } else {
      ngRedux.configureStore( rootReducer, INITIAL_STATE, []);
    }
  }
}
