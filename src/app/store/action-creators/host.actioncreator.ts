import { SessionActionCreator } from './session.actioncreator';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { of, forkJoin } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { tap, map, catchError, filter, flatMap } from 'rxjs/operators'


import { IHostMemberships, IHostMember, IHost } from './../../interface';
import { HostService } from './../../services';
import { IAppState } from '../app.store';

import {
  HOST_GET_FAILED,
  HOST_GET_SUCCESS,
  HOST_SEND_REQUEST_FAILED,
  HOST_SEND_REQUEST_SUCCESS,
  HOST_CREATE_FAILED,
  HOST_CREATE_SUCCESS
} from '../actions/host.action';


@Injectable()
export class HostActionCreator {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private hostService: HostService,
    private sessionActionCreator: SessionActionCreator
  ) {}

  GetHosts (page: number = 0, limit: number = 10, _filter = null): Observable<IHost[]> {
    return this.hostService.GetHosts(page, limit, _filter)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode === 400) {
            this.ngRedux.dispatch({
              type: HOST_GET_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 500) {
            this.ngRedux.dispatch({
              type: HOST_GET_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 200) {
            this.ngRedux.dispatch({
              type: HOST_GET_SUCCESS,
              payload: {
                hosts: result.hosts,
                limit: limit,
                page: page,
                count: result.count
              }
            });
          }
        }),
        map((result: any) => result.hosts)
      );
  }

  SendHostRequest (_id: string): Observable<any> {
    return this.hostService.SendHostRequest(_id)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode === 400) {
            this.ngRedux.dispatch({
              type: HOST_SEND_REQUEST_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 500) {
            this.ngRedux.dispatch({
              type: HOST_SEND_REQUEST_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 201) {
            this.ngRedux.dispatch({
              type: HOST_SEND_REQUEST_SUCCESS
            });
          }
        }),
        flatMap(() => {
          return this.sessionActionCreator.SessionRehydrate()
        })
      );
  }

  CreateHost (host: IHost): Observable<any> {
    return this.hostService.AddNewHost(host)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode === 400) {
            this.ngRedux.dispatch({
              type: HOST_CREATE_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 500) {
            this.ngRedux.dispatch({
              type: HOST_CREATE_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 201) {
            this.ngRedux.dispatch({
              type: HOST_CREATE_SUCCESS,
              payload: {
                host: result.host
              }
            });
          }
        }),
        flatMap(() => {
          return this.sessionActionCreator.SessionRehydrate()
        })
      );
  }
}
