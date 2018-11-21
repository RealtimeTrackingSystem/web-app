import { IUser } from 'app/interface';
import { USER_DATA_DESTROY } from './../actions/user-data.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { of, forkJoin } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../app.store';
import { SessionService } from '../../services';
import { UserDataActionCreator } from './user-data.actioncreator';
import swal from 'sweetalert2';
import { ISessionCreate } from '../../interface/session/session-create.interface';
import { ISession } from '../../interface/session/session.interface';
import { IUserNew } from '../../interface/user/user-new.interface';
import { tap, catchError, map, flatMap, mergeAll, zip, zipAll, concat } from 'rxjs/operators'

import {
  SESSION_CREATE_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_DESTROY_FULFILLED,
  SESSION_REGISTRATION_FAILED,
  SESSION_FORGOT_PASSWORD_FULFILLED,
  SESSION_FORGOT_PASSWORD_FAILED,
  SESSION_PASSWORD_CHANGE_FULFILLED,
  SESSION_PASSWORD_CHANGE_FAILED
} from '../actions/session.action';

import {
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS
} from '../actions/user-data.action';

@Injectable()

export class SessionActionCreator {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private sessionService: SessionService,
    private userDataActionCreator: UserDataActionCreator
  ) {}

  Register (userNew: IUserNew): Observable<ISession> {
    return this.sessionService.Register(userNew)
      .pipe(
        catchError(error => of(JSON.parse(error._body))),
        tap(result => {
          if (result.httpCode === 400) {
            this.ngRedux.dispatch({
              type: SESSION_REGISTRATION_FAILED,
              payload: {
                validationError: result.message
              }
            });
            throw result;
          } else if (result.httpCode === 500) {
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FAILED,
              payload: {
                error: result.message
              }
            });
            throw result;
          } else if (result.httpCode === 201) {
            const session: ISession = {
              token: result.payload.token,
              user: result.payload.user
            }
            this.sessionService.SessionSave(session);
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FULFILLED,
              payload: {
                token: result.payload.token,
                user: result.payload.user
              }
            });
          }
        }),
        flatMap(
          result => {
            return forkJoin(
              of(result.payload),
              this.userDataActionCreator.PopulateReporter(result.payload.user.reporterID),
              this.userDataActionCreator.PopulateHosts(result.payload.user.hosts),
              this.userDataActionCreator.PopulateUser(result.payload.user),
              this.userDataActionCreator.PopulateActiveHost()
            );
          }
        ),
        map(result => {
          if (Array.isArray(result)) {
            return result[0];
          }
          return result;
        })
      );
  }

  Login (newSession: ISessionCreate): Observable<ISession> {
    return this.sessionService.Login(newSession)
      .pipe(
        catchError(error => of(error)),
        tap(result => {
          if (result.status === 401) {
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FAILED,
              payload: {
                error: result.statusText
              }
            });
          } else if (result.status === 'SUCCESS') {
            const session: ISession = {
              token: result.payload.token,
              user: result.payload.user
            }
            this.sessionService.SessionSave(session);
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FULFILLED,
              payload: result.payload
            });
          } else {
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FAILED,
              payload: {
                error: 'Internal Server Error'
              }
            });
          }
        }),
        flatMap(
          result => {
            if (result.payload) {
              return forkJoin(
                of(result.payload),
                this.userDataActionCreator.PopulateReporter(result.payload.user.reporterID),
                this.userDataActionCreator.PopulateHosts(result.payload.user.hosts),
                this.userDataActionCreator.PopulateUser(result.payload.user),
                this.userDataActionCreator.PopulateActiveHost()
              );
            } else {
              return of(result);
            }
          }
        ),
        map(result => {
          if (Array.isArray(result)) {
            return result[0];
          }
          return result;
        })
      );
  }

  SessionCheck (): Observable<ISession> {
    return of(this.sessionService.SessionRead())
      .pipe(
        tap(result => {
          if (result) {
            const session: ISession = {
              token: result.token,
              user: result.user
            }
            this.sessionService.SessionSave(session);
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FULFILLED,
              payload: result
            });
          }
        }),
        flatMap(
          result => {
            if (result) {
              return forkJoin(
                of(result),
                this.userDataActionCreator.PopulateReporter(result.user.reporterID),
                this.userDataActionCreator.PopulateHosts(result.user.hosts),
                this.userDataActionCreator.PopulateUser(result.user),
                this.userDataActionCreator.PopulateActiveHost()
              );
            } else {
              return of(result);
            }
          }
        ),
        map(result => {
          if (Array.isArray(result)) {
            return result[0];
          }
          return result;
        })
      );
  }

  SessionRehydrate (): Observable<ISession> {
    return this.sessionService.Rehydrate()
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.status === 401) {
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FAILED,
              payload: {
                error: result.statusText
              }
            });
          } else if (result.status === 'SUCCESS') {
            const session: ISession = {
              token: result.payload.token,
              user: result.payload.user
            }
            this.sessionService.SessionSave(session);
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FULFILLED,
              payload: result.payload
            });
          } else {
            this.ngRedux.dispatch({
              type: SESSION_CREATE_FAILED,
              payload: {
                error: 'Internal Server Error'
              }
            });
          }
        }),
        map(result => result.payload),
        flatMap(
          result => {
            if (result) {
              return forkJoin(
                of(result),
                this.userDataActionCreator.PopulateReporter(result.user.reporterID),
                this.userDataActionCreator.PopulateHosts(result.user.hosts),
                this.userDataActionCreator.PopulateUser(result.user),
                this.userDataActionCreator.PopulateActiveHost()
              );
            } else {
              return of(result);
            }
          }
        ),
        map(result => {
          if (Array.isArray(result)) {
            return result[0];
          }
          return result;
        })
      );
  }

  Logout (): void {
    this.ngRedux.dispatch({
      type: SESSION_DESTROY_FULFILLED
    });
    this.ngRedux.dispatch({
      type: USER_DATA_DESTROY
    });
    this.sessionService.SessionDestroy();
  }

  ForgotPassword (email: string) {
    return this.sessionService.ForgotPassword(email)
      .pipe(
        catchError(error => of(error.error)),
        tap(response => {
          switch (response.httpCode) {
            case 401: {
              this.ngRedux.dispatch({
                type: SESSION_FORGOT_PASSWORD_FAILED,
                payload: {
                  error: response.message
                }
              })
            }
            break;
            case 201: {
              this.ngRedux.dispatch({
                type: SESSION_FORGOT_PASSWORD_FULFILLED
              });
            }
            break;
            default: {
              this.ngRedux.dispatch({
                type: SESSION_FORGOT_PASSWORD_FAILED,
                payload: {
                  error: response.message || 'Internal Server Error'
                }
              })
            }
          }
        })
      );
  }
  ChangePassword (oldPassword: string, newPassword: string, passwordConfirmation: string) {
    return this.sessionService.ChangePassword(oldPassword, newPassword, passwordConfirmation)
      .pipe(
        catchError(error => of(error.error)),
        tap(response => {
          switch (response.httpCode) {
            case 401: {
              this.ngRedux.dispatch({
                type: SESSION_PASSWORD_CHANGE_FAILED,
                payload: {
                  error: response.message
                }
              })
            }
            break;
            case 201: {
              this.ngRedux.dispatch({
                type: SESSION_PASSWORD_CHANGE_FULFILLED
              });
            }
            break;
            default: {
              this.ngRedux.dispatch({
                type: SESSION_PASSWORD_CHANGE_FAILED,
                payload: {
                  error: response.message || 'Internal Server Error'
                }
              })
            }
          }
        })
      );
  }

  UpdateProfile(user: IUser) {
    return this.sessionService.UpdateProfile(user)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          switch (result.httpCode) {
            case 400: {
              this.ngRedux.dispatch({
                type: USER_UPDATE_FAILED,
                payload: {
                  error: result.message
                }
              });
            }
            break;
            case 201: {
              this.ngRedux.dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: {
                  user: user
                }
              });
            }
            break;
            default: {
              this.ngRedux.dispatch({
                type: USER_UPDATE_FAILED,
                payload: {
                  error: result.message || 'An Error Occured while updating profile'
                }
              });
            }
          }
        }),
        flatMap(
          result => {
            if (result.httpCode === 201) {
              return this.SessionRehydrate();
            } else {
              return of(result);
            }
          }
        )
      )
  }
}
