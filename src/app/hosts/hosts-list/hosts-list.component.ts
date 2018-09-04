import { IHost } from './../../interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableClass } from '../../classes';

@Component({
  selector: 'app-hosts-list',
  templateUrl: './hosts-list.component.html',
  styleUrls: ['./hosts-list.component.scss']
})
export class HostsListComponent extends TableClass implements OnInit {

  @Input() hosts: IHost[];
  @Output() addButton = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  addToolTip (hostName) {
    return 'Send Request To Host: ' + hostName;
  }

  onAddButton (host: IHost) {
    this.addButton.emit(host);
  }

}
