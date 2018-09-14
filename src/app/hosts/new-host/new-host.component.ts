import { HostActionCreator } from './../../store/action-creators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MapPointerModalComponent } from '../../maps';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-host',
  templateUrl: './new-host.component.html',
  styleUrls: ['./new-host.component.scss']
})
export class NewHostComponent implements OnInit {
  public newHostForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {
    this.newHostForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required],
      hostNature: [null, Validators.required],
      tags: [null, Validators.required],
      long: [null],
      lat: [null],
      street: [null, Validators.required],
      barangay: [null, Validators.required],
      city: [null, Validators.required],
      region: [null, Validators.required],
      country: [null, Validators.required],
      zip: [null, Validators.required]
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MapPointerModalComponent, {
      width: '750px',
      data: {
        lat: Number(this.newHostForm.value.lat) || 14.6527531,
        lng: Number(this.newHostForm.value.long) || 120.9824008,
        markerLat: Number(this.newHostForm.value.lat) || 14.6527531,
        markerLng: Number(this.newHostForm.value.long) || 120.9824008,
        zoom: 15
      }
    });

    dialogRef.afterClosed().toPromise()
      .then(result => {
        this.newHostForm.value.long = result.lng;
        this.newHostForm.value.lat = result.lat;
      });
  }

  submit () {
    if (this.newHostForm.valid) {
      this.hostActionCreator.CreateHost(this.newHostForm.value)
        .toPromise()
        .then();
    } else {
      swal('Invalid Form', 'Please Fillup all the fields', 'warning');
    }
  }

}
