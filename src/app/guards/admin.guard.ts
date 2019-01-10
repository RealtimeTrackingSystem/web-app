import { map } from 'rxjs/operators';
import { IHostMemberships } from './../interface';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';
import { UserDataActionCreator } from '../store/action-creators/user-data.actioncreator';
import { IUserDataStore } from 'app/store/user-data.store';


@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor (
    private router: Router,
    private userDataActionCreator: UserDataActionCreator
  ) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userDataActionCreator.checkUserData()
      .pipe(
        map(userData => userData)
      )
      .toPromise()
      .then((userData: IUserDataStore) => {
        console.log(userData);
        if (!userData.user.accessLevel && userData.user && userData.user.accessLevel.toUpperCase() !== 'ADMIN') {
          swal({
            type: 'warning',
            title: 'Sorry',
            text: 'You are not authorized for this content',
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
        map(userData => userData)
      )
      .toPromise()
      .then((userData: IUserDataStore) => {
        if (!userData.user.accessLevel && userData.user && userData.user.accessLevel.toUpperCase() !== 'ADMIN') {
          swal({
            type: 'warning',
            title: 'Sorry',
            text: 'You are not authorized for this content',
          }).then(() => {
            this.router.navigate(['/public/dashboard']);
          });
        } else {
          return true;
        }
      });
  }
}
