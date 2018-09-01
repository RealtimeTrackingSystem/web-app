import { SessionActionCreator } from './../store/action-creators/session.actioncreator';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

import { ISession } from 'app/interface/session/session.interface';

@Injectable()
export class SessionGuard implements CanActivate, CanActivateChild {

  constructor (
    private router: Router,
    private sessionActionCreator: SessionActionCreator
  ) {}

  canActivate (
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionActionCreator.SessionCheck()
        .toPromise()
        .then(result => {
          if (!result) {
            swal({
              type: 'error',
              title: 'Session expired',
              text: 'Please log in to continue.',
            }).then(() => {
              this.router.navigate(['/auth/login']);
            });
          }
          return true;
        });
  }

  canActivateChild (
  ): Observable<boolean> | Promise<boolean> | boolean {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    if (!session || !session.token) {
      swal({
        type: 'error',
        title: 'Session expired',
        text: 'Please log in to continue.',
      }).then(() => {
        this.router.navigate(['auth/login']);
      });
    } else {
      return true;
    }
  }
}
