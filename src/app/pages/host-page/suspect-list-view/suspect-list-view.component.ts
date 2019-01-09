import { ReportService } from './../../../services/report.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { ReportActionCreator } from 'app/store/action-creators';
import { IHostMember } from './../../../interface';
import { map, flatMap } from 'rxjs/operators';

import { IAppState } from '../../../store/app.store';
import { NgRedux } from '@angular-redux/store';
import { ITable } from '../../../interface';

@Component({
  selector: 'app-suspect-list-view',
  templateUrl: './suspect-list-view.component.html',
  styleUrls: ['./suspect-list-view.component.scss']
})
export class SuspectListViewComponent implements OnInit, ITable {

  @select(s => s.report.suspects) $suspects: Observable<any[]>;
  @select(s => s.report.count) $count: Observable<number>;
  @select(s => s.report.page) $page: Observable<number>;
  @select(s => s.report.limit) $limit: Observable<number>;
  @select(s => s.userData.activeHost.hostMember) $hostMember: Observable<IHostMember>;

  public pageNumber = 0;
  public searchString = null;

  constructor(
    private reportService: ReportService,
    private ngRedux: NgRedux<IAppState>,
    private reportActionCreator: ReportActionCreator,
    private router: Router
  ) { }

  ngOnInit() {
    this.reportActionCreator.SearchSuspectsPaginated(this.pageNumber, 10, null)
      .toPromise()
      .then(console.log);
  }

  nextPage () {
    const {count, limit, page} = this.ngRedux.getState().report;
    if (limit * (page + 1) < count) {
      const pageNumber = this.pageNumber + 1;
      this.pageNumber += 1;
      if (this.searchString != null && this.searchString !== '') {
        return this.reportActionCreator.SearchSuspectsPaginated(pageNumber, 10, this.searchString)
          .toPromise().then();
      } else {
        return this.reportActionCreator.SearchSuspectsPaginated(pageNumber, 10, null)
          .toPromise().then();
      }
    }
  }

  prevPage () {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      if (this.searchString != null && this.searchString !== '') {
        return this.reportActionCreator.SearchSuspectsPaginated(pageNumber, 10, this.searchString)
          .toPromise().then();
      } else {
        return this.reportActionCreator.SearchSuspectsPaginated(pageNumber, 10, null)
          .toPromise().then();
      }
    }
  }

  firstPage () {
    this.pageNumber = 0;
    if (this.searchString != null && this.searchString !== '') {
      return this.reportActionCreator.SearchSuspectsPaginated(0, 10, this.searchString)
        .toPromise().then();
    } else {
      return this.reportActionCreator.SearchSuspectsPaginated(0, 10, null)
        .toPromise().then();
    }
  }

  lastPage () {
    const {count, limit} = this.ngRedux.getState().report;
    const lastPage = Math.ceil(count / limit) - 1;
    this.pageNumber = lastPage;
    if (this.searchString != null && this.searchString !== '') {
      return this.reportActionCreator.SearchSuspectsPaginated(lastPage, 10, this.searchString)
        .toPromise().then();
    } else {
      return this.reportActionCreator.SearchSuspectsPaginated(lastPage, 10, null)
        .toPromise().then();
    }
  }

  goToPage (pageNumber: number) {
    this.pageNumber = pageNumber;
    if (this.searchString != null && this.searchString !== '') {
      return this.reportActionCreator.SearchSuspectsPaginated(pageNumber, 10, this.searchString)
        .toPromise().then();
    } else {
      return this.reportActionCreator.SearchSuspectsPaginated(pageNumber, 10, null)
        .toPromise().then();
    }
  }

  searchSuspects (searchString: string) {
    this.searchString = searchString;
    if (this.searchString != null && this.searchString !== '') {
      return this.reportActionCreator.SearchSuspectsPaginated(0, 10, this.searchString)
        .toPromise().then();
    } else {
      return this.reportActionCreator.SearchSuspectsPaginated(0, 10, null)
        .toPromise().then();
    }
  }

  reportDetails (data: any) {
    if (data._report) {
      this.router.navigate(['/host/reports/details/' + data._report._id]);
    }
  }
}
