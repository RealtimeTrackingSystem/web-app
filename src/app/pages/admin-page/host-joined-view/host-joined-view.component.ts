import { HostService } from './../../../services/host.service';
import { Subscription } from 'rxjs/Subscription';
import { SessionActionCreator } from './../../../store/action-creators/session.actioncreator';
import { IUserDataStore } from './../../../store/user-data.store';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { ITable, IHost, IHostMemberships } from '../../../interface';
import { HostActionCreator } from '../../../store/action-creators';
import { IAppState } from '../../../store/app.store';
import { NgRedux } from '@angular-redux/store';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-host-joined-view',
  templateUrl: './host-joined-view.component.html',
  styleUrls: ['./host-joined-view.component.scss']
})
export class HostJoinedViewComponent implements OnInit {

  @select(s => s.host.hosts) $hosts: Observable<IHost[]>;
  @select(s => s.host.count) $count: Observable<number>;
  @select(s => s.host.limit) $limit: Observable<number>;
  @select(s => s.host.page) $page: Observable<number>;
  @select(s => s.userData.hostMemberships) $hostMemberships: Observable<IHostMemberships[]>;


  public hostMemberships: IHostMemberships[] = null;
  public hostMembershiptsSubscription: Subscription;

  public hostSearchString = '';

  public pageNumber = 0;
  public userData: IUserDataStore;
  public hostFilter: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private hostActionCreator: HostActionCreator,
    private hostService: HostService
  ) { }

  ngOnInit() {
    this.hostActionCreator.GetHosts(this.pageNumber, 10, this.hostFilter)
      .toPromise()
      .then(console.log);
  }

  prevPage () {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      this.hostActionCreator.GetHosts(pageNumber, 10, this.hostFilter).toPromise().then()
    }
  }
  nextPage () {
    const {count, limit, page} = this.ngRedux.getState().host;
    if (limit * (page + 1) < count) {
      const pageNumber = this.pageNumber + 1;
      this.pageNumber += 1;
      this.hostActionCreator.GetHosts(pageNumber, 10, this.hostFilter).toPromise().then()
    }
  }
  firstPage () {
    this.pageNumber = 0;
    this.hostActionCreator.GetHosts(0, 10, this.hostFilter).toPromise().then()
  }
  lastPage () {
    const {count, limit, page} = this.ngRedux.getState().host;
    const lastPage = Math.ceil(count / limit) - 1;
    this.pageNumber = lastPage;
    this.hostActionCreator.GetHosts(lastPage, 10, this.hostFilter).toPromise().then()
  }
  goToPage (pageNumber: number) {
    this.pageNumber = pageNumber;
    this.hostActionCreator.GetHosts(pageNumber, 10, this.hostFilter).toPromise().then()
  }

  confirmHost (host) {
    return this.hostService.ApproveHost(host._id)
      .pipe(
        catchError(error => of(error.error))
      )
      .toPromise()
      .then((result) => {
        if (result.httpCode !== 201) {
          return swal('Warning', result.message || 'An error occured while updating host', 'warning');
        } else {
          this.goToPage(this.pageNumber);
        }
      });
  }

  blockHost (host) {
    return this.hostService.DisapproveHost(host._id)
      .pipe(
        catchError(error => of(error.error))
      )
      .toPromise()
      .then((result) => {
        if (result.httpCode !== 201) {
          return swal('Warning', result.message || 'An error occured while updating host', 'warning');
        } else {
          this.goToPage(this.pageNumber);
        }
      });
  }

}
