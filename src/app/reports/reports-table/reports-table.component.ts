import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { IReport } from '../../interface';
import { Observable, of } from 'rxjs';
import { TableClass } from '../../classes';

import * as _ from 'lodash';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent extends TableClass implements OnInit, OnChanges {

  @Input() reports: IReport[];

  public isNext: boolean = this.page * this.limit < this.count;
  public isPrev: boolean = this.page > 0;
  public pages = [0];
  public filteredReports: IReport[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.filteredReports = this.reports;
  }

  ngOnChanges (changes) {
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
    this.filteredReports = this.reports;
  }

}
