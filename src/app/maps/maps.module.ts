import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { MapsRoutes } from './maps.routing';

import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';
import { GoogleMapsComponent } from './googlemaps/googlemaps.component';
import { VectorMapsComponent } from './vectormaps/vectormaps.component';
import { MapPointerModalComponent } from './map-pointer-modal/map-pointer-modal.component';
import { MaterialModule } from '../app.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(MapsRoutes),
    AgmCoreModule,
    FormsModule
  ],
  declarations: [
      FullScreenMapsComponent,
      GoogleMapsComponent,
      VectorMapsComponent,
      MapPointerModalComponent
  ],
  exports: [
    MapPointerModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MapsModule {}
