import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IHostMember } from './../../../interface';

@Component({
  selector: 'app-anaylitics',
  templateUrl: './anaylitics.component.html',
  styleUrls: ['./anaylitics.component.scss']
})
export class AnayliticsComponent implements OnInit {

  @select(s => s.userData.activeHost.hostMember._id) $hostId: Observable<IHostMember>;

  constructor() { }

  ngOnInit() {
  }

}
