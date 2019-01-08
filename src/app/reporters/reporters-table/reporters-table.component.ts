import { IReporter } from './../../interface';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { TableClass } from '../../classes';

@Component({
  selector: 'app-reporters-table',
  templateUrl: './reporters-table.component.html',
  styleUrls: ['./reporters-table.component.scss']
})
export class ReportersTableComponent extends TableClass implements OnInit {

  @Input() reporters: IReporter[];
  @Input() setAsAdminBtn: Boolean;
  @Input() hostRequestBtn: Boolean;
  @Output() clickCheck = new EventEmitter<any>();
  @Output() clickClear = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
  }

  onClickCheck (event) {
    this.clickCheck.emit(event);
  }

  onClickClear (event) {
    this.clickClear.emit(event);
  }

  isAdmin (reporter: any): Boolean {
    if (reporter.hosts && reporter.hosts[0] && reporter.hosts[0].isAdmin) {
      return true;
    } else {
      return false;
    }
  }

}
