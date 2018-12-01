import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReportActionCreator } from '../../../store/action-creators';
import { IReport, IHostMember } from './../../../interface';
import { map, flatMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { IAppState } from '../../../store/app.store';
import { NgRedux } from '@angular-redux/store';
import { ITable } from '../../../interface';

@Component({
  selector: 'app-reports-table-view',
  templateUrl: './reports-table-view.component.html',
  styleUrls: ['./reports-table-view.component.scss']
})
export class ReportsTableViewComponent implements OnInit, ITable {

  @select(s => s.report.reports) $reports: Observable<IReport[]>;
  @select(s => s.report.count) $count: Observable<number>;
  @select(s => s.report.page) $page: Observable<number>;
  @select(s => s.report.limit) $limit: Observable<number>;
  @select(s => s.userData.activeHost.hostMember) $hostMember: Observable<IHostMember>;

  public pageNumber = 0;
  public searchString = '';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private reportActionCreator: ReportActionCreator,
    private router: Router
  ) { }

  ngOnInit() {
    this.$hostMember
    .pipe(
      flatMap((hostMember) => {
        const options = {host: hostMember._id};
        return this.reportActionCreator.GetReports(this.pageNumber, 10, [], ['host'], options)
      })
    )
      .toPromise()
      .then();
  }

  nextPage () {
    const {count, limit, page} = this.ngRedux.getState().report;
    if (limit * (page + 1) < count) {
      const pageNumber = this.pageNumber + 1;
      this.pageNumber += 1;
      this.$hostMember
        .pipe(
          flatMap((hostMember) => {
            if (this.searchString != null && this.searchString !== '') {
              const options = {hostId: hostMember._id};
              return this.reportActionCreator.SearchReportPaginated(pageNumber, 10, this.searchString, options)
            } else {
              const options = {host: hostMember._id};
              return this.reportActionCreator.GetReports(pageNumber, 10, [], ['host'], options)
            }
          })
        )
        .toPromise().then();
    }
  }

  prevPage () {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      this.$hostMember
        .pipe(
          flatMap((hostMember) => {
            if (this.searchString != null && this.searchString !== '') {
              const options = {hostId: hostMember._id};
              return this.reportActionCreator.SearchReportPaginated(pageNumber, 10, this.searchString, options)
            } else {
              const options = {host: hostMember._id};
              return this.reportActionCreator.GetReports(pageNumber, 10, [], ['host'], options)
            }
          })
        )
        .toPromise().then();
    }
  }

  firstPage () {
    this.pageNumber = 0;
    this.$hostMember
        .pipe(
          flatMap((hostMember) => {
            if (this.searchString != null && this.searchString !== '') {
              const options = {hostId: hostMember._id};
              return this.reportActionCreator.SearchReportPaginated(0, 10, this.searchString, options)
            } else {
              const options = {host: hostMember._id};
              return this.reportActionCreator.GetReports(0, 10, [], ['host'], options)
            }
          })
        )
        .toPromise().then();
  }

  lastPage () {
    const {count, limit} = this.ngRedux.getState().report;
    const lastPage = Math.ceil(count / limit) - 1;
    this.pageNumber = lastPage;
    this.$hostMember
        .pipe(
          flatMap((hostMember) => {
            if (this.searchString != null && this.searchString !== '') {
              const options = {hostId: hostMember._id};
              return this.reportActionCreator.SearchReportPaginated(lastPage, 10, this.searchString, options)
            } else {
              const options = {host: hostMember._id};
              return this.reportActionCreator.GetReports(lastPage, 10, [], ['host'], options)
            }
          })
        )
        .toPromise().then();
  }

  goToPage (pageNumber: number) {
    this.pageNumber = pageNumber;
    this.$hostMember
        .pipe(
          flatMap((hostMember) => {
            if (this.searchString != null && this.searchString !== '') {
              const options = {hostId: hostMember._id};
              return this.reportActionCreator.SearchReportPaginated(pageNumber, 10, this.searchString, options)
            } else {
              const options = {host: hostMember._id};
              return this.reportActionCreator.GetReports(pageNumber, 10, [], ['host'], options)
            }
          })
        )
        .toPromise().then();
  }

  reportDetails (event) {
    if (event._id) {
      this.router.navigate(['/host/reports/details/' + event._id]);
    }
  }

  searchReport (searchString: string) {
    this.searchString = searchString;
    this.$hostMember
        .pipe(
          flatMap((hostMember) => {
            if (searchString != null && searchString !== '') {
              const options = {hostId: hostMember._id};
              return this.reportActionCreator.SearchReportPaginated(0, 10, this.searchString, options)
            } else {
              const options = {host: hostMember._id};
              return this.reportActionCreator.GetReports(0, 10, [], ['host'], options)
            }
          })
        )
        .toPromise().then();
  }

}
