import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.store';
import {
  REPORTER_GET_PENDING_REQUEST_FAILED,
  REPORTER_GET_PENDING_REQUEST_SUCCESS,
  REPORTER_ACCEPT_REQUEST_FAILED,
  REPORTER_ACCEPT_REQUEST_SUCCESS
} from '../actions/reporter.action';
import { tap, catchError, map, flatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ReporterService } from '../../services';
import { IReporter } from '../../interface/reporter/reporter.interface';


@Injectable()

export class ReporterActionCreator {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private reporterService: ReporterService
  ) { }

  GetPendingHostRequests (hostID: string, page = 0, limit = 10): Observable<any> {
    return this.reporterService.GetHostPendingRequest(hostID, page, limit)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode !== 200) {
            this.ngRedux.dispatch({
              type: REPORTER_GET_PENDING_REQUEST_FAILED,
              payload: {
                error: result.message
              }
            });
          }
          if (result.httpCode === 200) {
            this.ngRedux.dispatch({
              type: REPORTER_GET_PENDING_REQUEST_SUCCESS,
              payload: {
                reporters: result.users,
                page: page,
                limit: limit,
                count: result.count
              }
            });
          }
        }),
        map(result => {
          const reporters: IReporter[] = result.users.map((r: IReporter) => ({
            _id: r._id,
            username: r.username,
            email: r.email,
            fname: r.fname,
            lname: r.lname,
            alias: r.alias,
            street: r.street,
            barangay: r.barangay,
            city: r.city,
            region: r.region,
            country: r.country,
            zip: r.zip,
            reporterID: r.reporterID
          }));
          return reporters;
        })
      );
  }

  AcceptRequest (hostId: string, reporter: IReporter): Observable<any> {
    return this.reporterService.AcceptUserRequest(hostId, reporter._id)
      .pipe(
        catchError(error => of(error.error)),
        tap(result => {
          if (result.httpCode !== 201) {
            this.ngRedux.dispatch({
              type: REPORTER_ACCEPT_REQUEST_FAILED,
              payload: {
                error: result.message
              }
            });
          }
          if (result.httpCode === 201) {
            this.ngRedux.dispatch({
              type: REPORTER_ACCEPT_REQUEST_SUCCESS,
              payload: {
                reporter: reporter
              }
            });
          }
        }),
        flatMap(result => {
          if (result.httpCode === 201) {
            const reporterStore = this.ngRedux.getState().reporter;
            return this.GetPendingHostRequests(hostId, reporterStore.page, reporterStore.limit);
          }
        })
      );
  }

}
