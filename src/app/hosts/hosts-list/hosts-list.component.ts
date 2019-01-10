import { FormBuilder, FormGroup } from '@angular/forms';
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
  @Input() search = true;
  @Input() confirmHost = false;
  @Output() addButton = new EventEmitter<any>();
  @Output() searchHost = new EventEmitter<any>();
  @Output() confirmHostClick = new EventEmitter<any>();
  @Output() blockHostClick = new EventEmitter<any>();

  public searchHostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    console.log(this.hosts);
    this.searchHostForm = this.formBuilder.group({
      searchString: [null]
    });
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
  }

  addToolTip (hostName) {
    return 'Send Request To Host: ' + hostName;
  }

  addToolTip2 (hostName) {
    return 'Confirm Host: ' + hostName;
  }

  addToolTip3 (hostName) {
    return 'Block Host: ' + hostName;
  }

  onAddButton (host: IHost) {
    this.addButton.emit(host);
  }

  onConfirmHost (host: IHost) {
    this.confirmHostClick.emit(host);
  }

  onBlockHost (host: IHost) {
    this.blockHostClick.emit(host);
  }

  onSearchHost() {
    this.searchHost.emit(this.searchHostForm.value.searchString);
  }

}
