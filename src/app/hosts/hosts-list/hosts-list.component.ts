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
  @Output() addButton = new EventEmitter<any>();
  @Output() searchHost = new EventEmitter<any>();

  public searchHostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.searchHostForm = this.formBuilder.group({
      searchString: [null]
    });
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
  }

  addToolTip (hostName) {
    return 'Send Request To Host: ' + hostName;
  }

  onAddButton (host: IHost) {
    this.addButton.emit(host);
  }

  onSearchHost() {
    this.searchHost.emit(this.searchHostForm.value.searchString);
  }

}
