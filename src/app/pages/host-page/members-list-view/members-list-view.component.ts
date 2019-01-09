import { ITable } from './../../../interface/table/table.interface';
import { Observable, of } from 'rxjs';
import { select } from '@angular-redux/store';
import { IReporter } from './../../../interface/reporter/reporter.interface';
import { IUserDataStore } from './../../../store/user-data.store';
import { IAppState } from './../../../store/app.store';
import { NgRedux } from '@angular-redux/store';
import { ReporterActionCreator } from './../../../store/action-creators';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ReporterService } from 'app/services';
import { tap, catchError, map, flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-members-list-view',
  templateUrl: './members-list-view.component.html',
  styleUrls: ['./members-list-view.component.scss']
})
export class MembersListViewComponent implements OnInit, ITable {
  @select(s => s.reporter.reporters) $reporters: Observable<IReporter[]>;
  @select(s => s.reporter.count) $count: Observable<number>;
  @select(s => s.reporter.page) $page: Observable<number>;
  @select(s => s.reporter.limit) $limit: Observable<number>;

  public pageNumber = 0;

  constructor(
    private reporterActionCreator: ReporterActionCreator,
    private ngRedux: NgRedux<IAppState>,
    private reporterService: ReporterService
  ) { }

  ngOnInit() {
    const userData: IUserDataStore = this.ngRedux.getState().userData;
    this.reporterActionCreator.GetMembers(userData.activeHost.host._id, 0, 10)
      .toPromise()
      .then(console.log);
  }

  prevPage() {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetMembers(userData.activeHost.host._id, this.pageNumber, 10)
      .toPromise()
      .then();
    }
  }
  nextPage() {
    const {count, limit, page} = this.ngRedux.getState().reporter;
    if (limit * (page + 1) < count) {
      const pageNumber = this.pageNumber + 1;
      this.pageNumber += 1
      const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetMembers(userData.activeHost.host._id, pageNumber, 10)
      .toPromise()
      .then();
    }
  }
  firstPage() {
    this.pageNumber = 0;
    const userData: IUserDataStore = this.ngRedux.getState().userData;
    this.reporterActionCreator.GetMembers(userData.activeHost.host._id, 0, 10)
      .toPromise()
      .then();
  }
  lastPage() {
    const {count, limit} = this.ngRedux.getState().reporter;
    const lastPage = Math.ceil(count / limit) - 1;
    this.pageNumber = lastPage;
    const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetMembers(userData.activeHost.host._id, this.pageNumber, 10)
      .toPromise()
      .then();
  }
  goToPage(pageNumber: number) {
    const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetMembers(userData.activeHost.host._id, pageNumber, 10)
      .toPromise()
      .then();
  }

  // @TODO interface this with redux
  setAsAdmin (reporter) {
    const userData: IUserDataStore = this.ngRedux.getState().userData;
    if (userData.user._id === reporter._id) {
      return swal('Warning', 'You can\'t set yourself as admin', 'warning');
    }
    return this.reporterService.setAdminship(userData.activeHost.host._id, reporter._id, true)
      .pipe(
        catchError(error => of(error.error))
      )
      .toPromise()
      .then((result) => {
        if (result.httpCode === 201) {
          this.goToPage(this.pageNumber);
        } else {
          return swal('Warning', result.message || 'Internal server error', 'warning');
        }
      });
  }

  // @TODO interface this with redux
  unsetAsAdmin (reporter) {
    const userData: IUserDataStore = this.ngRedux.getState().userData;
    if (userData.user._id === reporter._id) {
      return swal('Warning', 'You can\'t remove yourself as admin', 'warning');
    }
    return this.reporterService.setAdminship(userData.activeHost.host._id, reporter._id, false)
      .pipe(
        catchError(error => of(error.error))
      )
      .toPromise()
      .then((result) => {
        if (result.httpCode === 201) {
          this.goToPage(this.pageNumber);
        } else {
          return swal('Warning', result.message || 'Internal server error', 'warning');
        }
      })
  }

}
