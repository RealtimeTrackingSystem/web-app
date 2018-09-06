import { ITable } from './../../../interface/table/table.interface';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IReporter } from './../../../interface/reporter/reporter.interface';
import { IUserDataStore } from './../../../store/user-data.store';
import { IAppState } from './../../../store/app.store';
import { NgRedux } from '@angular-redux/store';
import { ReporterActionCreator } from './../../../store/action-creators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-host-request-view',
  templateUrl: './pending-host-request-view.component.html',
  styleUrls: ['./pending-host-request-view.component.scss']
})
export class PendingHostRequestViewComponent implements OnInit, ITable {
  @select(s => s.reporter.reporters) $reporters: Observable<IReporter[]>;
  @select(s => s.reporter.count) $count: Observable<number>;
  @select(s => s.reporter.page) $page: Observable<number>;
  @select(s => s.reporter.limit) $limit: Observable<number>;
  constructor(
    private reporterActionCreator: ReporterActionCreator,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    const userData: IUserDataStore = this.ngRedux.getState().userData;
    this.reporterActionCreator.GetPendingHostRequests(userData.activeHost.host._id, 0, 10)
      .toPromise()
      .then();
  }

  prevPage() {}
  nextPage() {}
  firstPage() {}
  lastPage() {}
  goToPage(pageNumber: number) {}

}
