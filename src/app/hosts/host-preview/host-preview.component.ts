import { FormGroup, FormBuilder } from '@angular/forms';
import { IHostMemberships } from './../../interface/host/host-membership.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-host-preview',
  templateUrl: './host-preview.component.html',
  styleUrls: ['./host-preview.component.scss']
})
export class HostPreviewComponent implements OnInit {

  @Input() hostMembership: IHostMemberships;
  public hostMembershipForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.hostMembershipForm = this.formBuilder.group({
      name: [{ value: this.hostMembership.host.name, disabled: true }],
      email: [{ value: this.hostMembership.host.email, disabled: true }],
      description: [{ value: this.hostMembership.host.description, disabled: true }],
      location: [{ value: this.hostMembership.host.location, disabled: true }],
      status: [{ value: this.getStatus(), disabled: true }]
    });
  }

  getStatus (): string {
    let status: string;
    if (this.hostMembership.hostMember.isAdmin) {
      status = 'Admin';
    } else if (this.hostMembership.hostMember.isBlocked) {
      status = 'Pending Request';
    } else {
      status = 'Member';
    }
    return status;
  }

}
