import { FormBuilder, FormGroup } from '@angular/forms';
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
  @Output() searchReport = new EventEmitter<any>();

  public filteredReports: IReport[];
  public reportSearchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.filteredReports = this.reports;
    this.reportSearchForm = this.formBuilder.group({
      searchString: []
    });
  }

  ngOnChanges (changes) {
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
    this.filteredReports = this.reports;
  }

  onSearchReport () {
    this.searchReport.emit(this.reportSearchForm.value.searchString);
  }

  isAnonymous (report: any) {
    const hostId = report._host._id ? report._host._id : report._host;
    const userHostId = report.user && report.user.hosts[0] && report.user.hosts[0]._id ? report.user.hosts[0]._id : null;
    console.log(hostId, userHostId);
    return hostId !== userHostId;
  }

}
