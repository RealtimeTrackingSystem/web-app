import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { IReport } from '../../interface';
import { Observable, of } from 'rxjs';

import * as _ from 'lodash';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit, OnChanges {

  @Input() reports: IReport[];
  @Input() count: number;
  @Input() page: number;
  @Input() limit: number;
  @Output() nextPage = new EventEmitter<any>();
  @Output() prevPage = new EventEmitter<any>();
  @Output() firstPage = new EventEmitter<any>();
  @Output() lastPage = new EventEmitter<any>();
  @Output() goToPage = new EventEmitter<any>();
  @Output() reportDetails = new EventEmitter<any>();

  public isNext: boolean = this.page * this.limit < this.count;
  public isPrev: boolean = this.page > 0;
  public filteredReports: IReport[];
  constructor() { }

  ngOnInit() {
    this.filteredReports = this.reports;
  }

  ngOnChanges (changes) {
    console.log(changes);
    console.log(this.page);
    this.filteredReports = _.chunk(this.reports, this.limit)[this.page];
  }

  onNextPage () {
    this.nextPage.emit();
  }

  onPrevPage () {
    this.prevPage.emit();
  }

  onFirstPage () {
    this.firstPage.emit();
  }

  onLastPage () {
    this.lastPage.emit();
  }

  onTargetPage (pageNumber) {
    this.goToPage.emit(pageNumber);
  }

  onClickDetails (report: IReport) {
    this.reportDetails.emit(report);
  }

}
