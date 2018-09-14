import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-map-pointer-modal',
  templateUrl: './map-pointer-modal.component.html',
  styleUrls: ['./map-pointer-modal.component.scss']
})
export class MapPointerModalComponent implements OnInit {
  public lat;
  public lng;
  public markerLat;
  public markerLng;
  public zoom = 15;

  constructor(
    public dialogRef: MatDialogRef<MapPointerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.lat = this.data.lat;
    this.lng = this.data.lng;
    this.markerLat = this.data.markerLat;
    this.markerLng = this.data.markerLng;
    this.zoom = this.data.zoom;
  }

  mapClicked (event) {
    this.markerLat = event.coords.lat;
    this.markerLng = event.coords.lng;
  }

  onConfirmClick(): void {
    this.dialogRef.close({
      lng: this.markerLng,
      lat: this.markerLat
    });
  }

}
