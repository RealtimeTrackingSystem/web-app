import { map } from 'rxjs/operators';
import { IHostMemberships } from './../interface';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';
import { UserDataActionCreator } from '../store/action-creators/user-data.actioncreator';

@Injectable()
export class HostGuard implements CanActivate, CanActivateChild {

  constructor (
    private router: Router,
    private userDataActionCreator: UserDataActionCreator
  ) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userDataActionCreator.checkUserData()
      .pipe(
        map(userData => userData.activeHost)
      )
      .toPromise()
      .then((activeHost: IHostMemberships) => {
        if (!activeHost) {
          swal({
            type: 'warning',
            title: 'No Host selected',
            text: 'Please select a host',
          }).then(() => {
            this.router.navigate(['/public/dashboard']);
          });
        } else {
          return true;
        }
      });
  }

  canActivateChild(
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userDataActionCreator.checkUserData()
      .pipe(
        map(userData => userData.activeHost)
      )
      .toPromise()
      .then((activeHost: IHostMemberships) => {
        if (!activeHost) {
          swal({
            type: 'warning',
            title: 'No Host selected',
            text: 'Please select a host',
          }).then(() => {
            this.router.navigate(['/public/dashboard']);
          });
        } else {
          return true;
        }
      });
  }
}
