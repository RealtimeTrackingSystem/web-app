import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReportActionCreator } from '../../../store/action-creators';
import { IReport } from './../../../interface';
import { map, flatMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { IAppState } from '../../../store/app.store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-reports-table-view',
  templateUrl: './reports-table-view.component.html',
  styleUrls: ['./reports-table-view.component.scss']
})
export class ReportsTableViewComponent implements OnInit {

  @select(s => s.report.reports) $reports: Observable<IReport[]>;
  @select(s => s.report.count) $count: Observable<number>;
  @select(s => s.report.page) $page: Observable<number>;
  @select(s => s.report.limit) $limit: Observable<number>;

  public pageNumber = 0;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private reportActionCreator: ReportActionCreator,
    private router: Router
  ) { }

  ngOnInit() {
    this.reportActionCreator.GetReports(this.pageNumber, 10).toPromise()
      .then();
  }

  nextPage () {
    const {count, limit, page} = this.ngRedux.getState().report;
    if (limit * (page + 1) < count) {
      const pageNumber = this.pageNumber + 1;
      this.pageNumber += 1;
      this.reportActionCreator.GetReports(pageNumber, 10).toPromise().then();
    }
  }

  prevPage () {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      this.reportActionCreator.GetReports(pageNumber, 10).toPromise().then();
    }
  }

  firstPage () {
    this.pageNumber = 0;
    this.reportActionCreator.GetReports(0, 10).toPromise()
      .then();
  }

  lastPage () {
    // const {count, limit, page} = this.ngRedux.getState().report;
    // const lastPage = Math.ceil(count / limit);
    // this.reportActionCreator.GetReports(lastPage, 10).toPromise()
    //   .then();
  }

  goToPage (event) {
    console.log('go to page', event);
  }

  reportDetails (event) {
    if (event._id) {
      this.router.navigate(['/host/reports/details/' + event._id]);
    }
  }

}
