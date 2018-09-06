import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import PerfectScrollbar from 'perfect-scrollbar';

import { UserDataActionCreator } from './../../store/action-creators/user-data.actioncreator';
import { select, NgRedux } from '@angular-redux/store';
import { IHostMemberships } from '../../interface';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RouteInfo } from '../../interface/route/route-info.interface';
import { IAppState } from '../../store/app.store';

import * as _ from 'lodash';

declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './host-layout.component.html'
})

export class HostLayoutComponent implements OnInit, AfterViewInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  url: string;
  location: Location;
  public hostMemberships: Observable<IHostMemberships[]>;
  @ViewChild('sidebar') sidebar: any;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  @select(s => s.userData.hostMemberships) $hostMemberships: Observable<IHostMemberships[]>;
  @select(s => s.userData.activeHost) activeHost: Observable<IHostMemberships>;


  constructor(
    private router: Router,
    location: Location,
    private userDataActionCreator: UserDataActionCreator,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.location = location;
  }
  ngOnInit() {
    if (this.router.url === '/host') {
      this.router.navigate(['/host/dashboard']);
    }
    this.hostMemberships = this.$hostMemberships
        .pipe(
          map(result => {
            return result.filter(h => {
              return !h.hostMember.isBlocked;
            })
          })
        );
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        }
        else
          window.scrollTo(0, 0);
      }
    });
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.navbar.sidebarClose();
    });


  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  public isMap() {
    if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
      return true;
    } else {
      return false;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
      ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  setHost($event) {
    this.userDataActionCreator.ChangeActiveHost($event)
      .toPromise()
      .then((hostMembership: IHostMemberships) => {
        this.router.navigate(['/host/dashboard']);
      });
  }
}
