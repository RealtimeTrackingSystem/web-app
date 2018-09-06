import { REPORT_GET_DETAILS_SUCCESS, REPORT_GET_DETAILS_FAILED } from './../actions/report.action';
import { catchError, tap, map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of, forkJoin } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import swal from 'sweetalert2';
import { IAppState } from '../app.store';
import {
  REPORT_GET_FAILED,
  REPORT_GET_FULFILLED,
  REPORT_GET_DATA
} from '../actions/report.action';
import { Subscription } from 'rxjs/Subscription';
import { ReportService, DialogService } from '../../services';
import { IReport } from '../../interface/report/report.interface';
import * as moment from 'moment';
import { IReportStore } from '../report.store';


@Injectable()

export class ReportActionCreator {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private reportService: ReportService
  ) {}


  MapReport (report): IReport {
    return ({
      _id: report._id,
      title: report.title,
      description: report.description,
      location: report.location,
      long: report.long,
      lat: report.lat,
      _reporter: report._reporter,
      _host: report._host,
      status: report.status,
      people: report.people,
      properties: report.properties,
      medias: report.medias,
      tags: report.tags,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt
    });
  }

  GetReportData (report): Observable<IReport> {
    return of(report)
      .pipe(
        map(this.MapReport),
        tap(result => {
          this.ngRedux.dispatch({
            type: REPORT_GET_DATA,
            payload: {
              report: result
            }
          });
        })
      );
  }

  GetReportDatas (reports: IReport[]): Observable<IReport[]> {
    if (reports.length < 1) {
      return of([]);
    }
    const _reports = reports.map(report => this.GetReportData(report));
    return forkJoin(_reports);
  }

  GetReports (page: number = 0, limit: number = 10, tags: string[] = [], resources: string[] = []): Observable<IReportStore> {
    return this.reportService.GetReports(page, limit, tags, resources)
      .pipe(
        catchError(error => of(JSON.parse(error._body))),
        tap(result => {
          if (result.httpCode === 400) {
            this.ngRedux.dispatch({
              type: REPORT_GET_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 500) {
            this.ngRedux.dispatch({
              type: REPORT_GET_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 200) {
            this.ngRedux.dispatch({
              type: REPORT_GET_FULFILLED,
              payload: {
                reports: result.reports,
                limit: limit,
                page: page,
                count: result.count
              }
            });
          }
        }),
        map(result => ({
          reports: result.reports,
          reportDetails: null,
          page: page,
          limit: limit,
          count: result.count,
          error: null,
          success: result.status,
          spinner: false
        }))
      );
  }

  GetReportDetails (_id): Observable<IReport> {
    const resources = ['reporter', 'host', 'people', 'properties', 'medias'];
    return this.reportService.GetReportsById(_id, resources)
      .pipe(
        catchError(error => {
          if (error.statusText === 'Unknown Error') {
            return of({
              status: 'ERROR',
              httpCode: 404,
              message: 'Report Not Found'
            })
          }
          return of(JSON.parse(error._body))
        }),
        tap(result => {
          if (result.httpCode === 400) {
            this.ngRedux.dispatch({
              type: REPORT_GET_DETAILS_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 404) {
            this.ngRedux.dispatch({
              type: REPORT_GET_DETAILS_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 500) {
            this.ngRedux.dispatch({
              type: REPORT_GET_DETAILS_FAILED,
              payload: {
                error: result.message
              }
            });
          } else if (result.httpCode === 200) {
            this.ngRedux.dispatch({
              type: REPORT_GET_DETAILS_SUCCESS,
              payload: {
                report: this.MapReport(result.report)
              }
            });
          }
        }),
      );
  }
}
