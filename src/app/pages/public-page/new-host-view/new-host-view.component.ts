import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { IHostMemberships } from 'app/interface';

@Component({
  selector: 'app-new-host-view',
  templateUrl: './new-host-view.component.html',
  styleUrls: ['./new-host-view.component.scss']
})
export class NewHostViewComponent implements OnInit, OnDestroy {


  @select (s => s.userData.hostMemberships) $hostMemberships: Observable<IHostMemberships[]>;
  private hostMembershipSubscription: Subscription;
  public hostMemberships: IHostMemberships[];
  constructor() { }

  ngOnInit() {
    this.hostMembershipSubscription = this.$hostMemberships
      .subscribe((hostMemberships: IHostMemberships[]) => {
        if (hostMemberships) {
          this.hostMemberships = hostMemberships
        }
      });
  }

  ngOnDestroy() {
    this.hostMembershipSubscription.unsubscribe();
  }

}
