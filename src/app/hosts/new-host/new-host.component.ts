import { HostActionCreator } from './../../store/action-creators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-host',
  templateUrl: './new-host.component.html',
  styleUrls: ['./new-host.component.scss']
})
export class NewHostComponent implements OnInit {
  public newHostForm: FormGroup;
  constructor(
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
      long: [null, Validators.required],
      lat: [null, Validators.required],
      street: [null, Validators.required],
      barangay: [null, Validators.required],
      city: [null, Validators.required],
      region: [null, Validators.required],
      country: [null, Validators.required],
      zip: [null, Validators.required]
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
