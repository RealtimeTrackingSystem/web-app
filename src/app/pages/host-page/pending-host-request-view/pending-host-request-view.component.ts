import { ITable } from './../../../interface/table/table.interface';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IReporter } from './../../../interface/reporter/reporter.interface';
import { IUserDataStore } from './../../../store/user-data.store';
import { IAppState } from './../../../store/app.store';
import { NgRedux } from '@angular-redux/store';
import { ReporterActionCreator } from './../../../store/action-creators';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

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

  public pageNumber = 0;

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

  prevPage() {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetPendingHostRequests(userData.activeHost.host._id, this.pageNumber, 10)
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
      this.reporterActionCreator.GetPendingHostRequests(userData.activeHost.host._id, pageNumber, 10)
      .toPromise()
      .then();
    }
  }
  firstPage() {
    this.pageNumber = 0;
    const userData: IUserDataStore = this.ngRedux.getState().userData;
    this.reporterActionCreator.GetPendingHostRequests(userData.activeHost.host._id, 0, 10)
      .toPromise()
      .then();
  }
  lastPage() {
    const {count, limit} = this.ngRedux.getState().reporter;
    const lastPage = Math.ceil(count / limit) - 1;
    this.pageNumber = lastPage;
    const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetPendingHostRequests(userData.activeHost.host._id, this.pageNumber, 10)
      .toPromise()
      .then();
  }
  goToPage(pageNumber: number) {
    const userData: IUserDataStore = this.ngRedux.getState().userData;
      this.reporterActionCreator.GetPendingHostRequests(userData.activeHost.host._id, pageNumber, 10)
      .toPromise()
      .then();
  }

  acceptRequest (reporter) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to accept ' + reporter.fname + ' ' + reporter.lname + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
    .then(result => {
      if (result.value) {
        const userData: IUserDataStore = this.ngRedux.getState().userData;
        this.reporterActionCreator.AcceptRequest(userData.activeHost.host._id, reporter)
          .toPromise()
          .then();
      }
    });
  }

  rejectRequest (reporter) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to reject ' + reporter.fname + ' ' + reporter.lname + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
    .then(result => {
      if (result.value) {
        console.log(reporter);
        const userData: IUserDataStore = this.ngRedux.getState().userData;
        this.reporterActionCreator.RejectRequest(userData.activeHost.host._id, reporter)
          .toPromise()
          .then();
      }
    });
  }

}
