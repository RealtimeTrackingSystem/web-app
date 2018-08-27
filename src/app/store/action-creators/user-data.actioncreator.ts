import { IUser } from './../../interface/user/user.interface';
import { HostService } from './../../services/host.service';
import { IHost } from './../../interface/host/host.interface';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { of, forkJoin } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../app.store';
import { ReporterService } from '../../services';
import { tap, map, catchError, filter } from 'rxjs/operators'

import {
  USER_DATA_POPULATE_REPORTER_SUCCESS,
  USER_DATA_POPULATE_REPORTER_ERROR,
  USER_DATA_POPULATE_HOST_SUCCESS,
  USER_DATA_POPULATE_USER_SUCCESS
} from '../actions/user-data.action';
import { IReporter } from '../../interface';


@Injectable()

export class UserDataActionCreator {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private reporterService: ReporterService,
    private hostService: HostService
  ) {}

  PopulateReporter (_id: string): Observable<IReporter> {
    return this.reporterService.GetReporterById(_id)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode !== 200) {
            this.ngRedux.dispatch({
              type: USER_DATA_POPULATE_REPORTER_ERROR,
              payload: {
                error: {
                  type: USER_DATA_POPULATE_REPORTER_ERROR,
                  message: result.message || 'Internal Server Error'
                }
              }
            });
          } else {
            this.ngRedux.dispatch({
              type: USER_DATA_POPULATE_REPORTER_SUCCESS,
              payload: {
                reporter: result.reporter
              }
            });
          }
        }),
        map(result => ({
          ...result.reporter
        }))
      );
  }

  PopulateHosts (hosts: IHost[]): Observable<IHost[]> {
    const getHosts = host => {
      return this.hostService.GetHostById(host._id)
        .pipe(
          catchError(error => of(error.error)),
          filter(result => result.httpCode === 200),
          map(result => result.host),
          filter(result => result !== null),
          tap(result => {
            this.ngRedux.dispatch({
              type: USER_DATA_POPULATE_HOST_SUCCESS,
              payload: {
                host: host,
                hostMember: result
              }
            });
          })
        );
    };
    const _hosts = hosts.map(getHosts);
    return forkJoin(_hosts);
  }

  PopulateUser (user: IUser): Observable<IUser> {
    return of(user)
      .pipe(
        tap(result => {
          this.ngRedux.dispatch({
            type: USER_DATA_POPULATE_USER_SUCCESS,
            payload: {
              user: result
            }
          })
        })
      );
  }
}

