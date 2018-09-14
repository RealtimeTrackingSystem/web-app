import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public title = 'dashboard.title';
  public body = 'dashboard.body';
  lat = 14.6527531;
  lng = 120.9824008;
  markerLat = 14.6527531;
  markerLng = 120.9824008;
  zoom = 15;
  ngOnInit() { }
  mapClicked (event) {
    console.log(event);
    this.markerLat = event.coords.lat;
    this.markerLng = event.coords.lng;
  }
}
