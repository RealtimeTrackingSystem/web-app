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

@Component({
  selector: 'app-host-list-view',
  templateUrl: './host-list-view.component.html',
  styleUrls: ['./host-list-view.component.scss']
})
export class HostListViewComponent implements OnInit, OnDestroy, ITable {
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
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
    this.userData = this.ngRedux.getState().userData;
    if (this.userData.hostMemberships.length > 0) {
      this.hostFilter
        = '_id:'
        + this.userData.hostMemberships.map(hm => hm.host._id).join(',')
        + ':false';
    }
    this.hostActionCreator.GetHosts(this.pageNumber, 10, this.hostFilter)
      .toPromise()
      .then();

    this.hostMembershiptsSubscription = this.$hostMemberships
      .subscribe((hostMemberships: IHostMemberships[]) => {
        if (hostMemberships) {
          this.hostMemberships = hostMemberships;
        } else {
          this.hostMemberships = [];
        }
      });
  }

  ngOnDestroy () {
    this.hostMembershiptsSubscription.unsubscribe();
  }

  prevPage () {
    if (this.pageNumber !== 0) {
      const pageNumber = this.pageNumber - 1;
      this.pageNumber -= 1;
      (this.hostSearchString === '' || this.hostSearchString == null)
        ? this.hostActionCreator.GetHosts(pageNumber, 10, this.hostFilter).toPromise().then()
        : this.hostActionCreator.SearchHostPaginate(this.hostSearchString, pageNumber, 10).toPromise().then();
    }
  }
  nextPage () {
    const {count, limit, page} = this.ngRedux.getState().host;
    if (limit * (page + 1) < count) {
      const pageNumber = this.pageNumber + 1;
      this.pageNumber += 1;
      (this.hostSearchString === '' || this.hostSearchString == null)
        ? this.hostActionCreator.GetHosts(pageNumber, 10, this.hostFilter).toPromise().then()
        : this.hostActionCreator.SearchHostPaginate(this.hostSearchString, pageNumber, 10).toPromise().then();
    }
  }
  firstPage () {
    this.pageNumber = 0;
    (this.hostSearchString === '' || this.hostSearchString == null)
        ? this.hostActionCreator.GetHosts(0, 10, this.hostFilter).toPromise().then()
        : this.hostActionCreator.SearchHostPaginate(this.hostSearchString, 0, 10).toPromise().then();
  }
  lastPage () {
    const {count, limit, page} = this.ngRedux.getState().host;
    const lastPage = Math.ceil(count / limit) - 1;
    this.pageNumber = lastPage;
    (this.hostSearchString === '' || this.hostSearchString == null)
        ? this.hostActionCreator.GetHosts(lastPage, 10, this.hostFilter).toPromise().then()
        : this.hostActionCreator.SearchHostPaginate(this.hostSearchString, lastPage, 10).toPromise().then();
  }
  goToPage (pageNumber: number) {
    this.pageNumber = pageNumber;
    (this.hostSearchString === '' || this.hostSearchString == null)
        ? this.hostActionCreator.GetHosts(pageNumber, 10, this.hostFilter).toPromise().then()
        : this.hostActionCreator.SearchHostPaginate(this.hostSearchString, pageNumber, 10).toPromise().then();
  }

  sendRequestToHost (host: IHost) {
    swal({
      title: 'Send Request To Join?',
      text: 'Would You Like send Request to Host: ' + host.name,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
      .then(result => {
        if (result.value) {
          this.hostActionCreator.SendHostRequest(host._id)
            .toPromise()
            .then(data => {
              const user = data.user;
              const filter
                = '_id:'
                + user.hosts.map(h => h._id).join(',')
                + ':false';
              this.hostFilter = filter;
              return this.hostActionCreator.GetHosts(0, 10, filter).toPromise();
            });
        }
      });
  }

  searchHost(hostSearchString: string) {
    this.hostSearchString = hostSearchString;
    (this.hostSearchString === '' || this.hostSearchString == null)
        ? this.hostActionCreator.GetHosts(0, 10, this.hostFilter).toPromise().then()
        : this.hostActionCreator.SearchHostPaginate(hostSearchString, 0, 10).toPromise().then();
  }
}
