import { IReport } from './../interface/report/report.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { ISession } from '../interface/session/session.interface';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

import { of, forkJoin } from 'rxjs';
@Injectable()
export class ReportService {

  private reportUrl = environment.API_URL + `/api/reports`;
  private peopleUrl = environment.API_URL + '/api/people';
  private VALID_RESOURCES: string[] = [
    'people', 'properties', 'medias', 'reporter', 'host'
  ];

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
) { }

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetReports(page: number = 0, limit: number = 10, tags: string[] = [], resources: string[] = [], options: any = {}): Observable<any> {
    const validResources = resources.filter(resource => this.VALID_RESOURCES.indexOf(resource) > -1);
    let query = '?page=' + page + '&limit=' + limit;
    if (validResources.length > 0) {
      query += '&resources=' + validResources.join(',');
    }
    if (tags.length > 0) {
      query += '&tags' + tags.join(',');
    }
    if (options.reporter) {
      query += '&reporter=' + options.reporter;
    }
    if (options.host) {
      query += '&host=' + options.host;
    }
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reportUrl + query, {
      headers: headers
    });
  }

  GetAllReports (): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reportUrl, {
      headers: headers
    });
  }

  SearchReportPaginated (page: number = 0, limit: number = 10, searchString: string, options: any = {}) {
    let query = '';
    query += '?';
    query += 'page=' + page;
    query += '&';
    query += 'limit=' + limit;
    if (options.isDuplicate != null) {
      query += '&isDuplicate=' + options.isDuplicate;
    }
    if (options.hostId) {
      query += '&hostId=' + options.hostId;
    }
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reportUrl + '/search/' + searchString + query, {
      headers: headers
    });
  }

  GetReportsById(_id: string, resources: string[] = []): Observable<any> {
    const validResources = resources.filter(resource => this.VALID_RESOURCES.indexOf(resource) > -1);
    const query = validResources.length > 0 ? '?resources=' + validResources.join(',') : '';
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reportUrl + '/' + _id + query, {
      headers: headers
    });
  }

  SendReport (report: IReport) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.post(this.reportUrl, report, {
      headers: headers
    });
  }

  GetAttachments (any) {
    return of(any);
  }

  UpdateReportStatus (reportId: string, status: string, note: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());

    return this.http.put(this.reportUrl + '/status/' + reportId, {
      status: status,
      note: note
    }, {
      headers: headers
    });
  }

  GetDuplicateReports (isDuplicate: boolean = true): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reportUrl + '/duplicates' + '?isDuplicate=' + isDuplicate.toString(), {
      headers: headers
    });
  }

  SetDuplicateReport (parentDuplicate: string, duplicate: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.post(this.reportUrl + '/duplicates', {
      parentDuplicate, duplicate
    }, {
      headers: headers
    });
  }

  SearchSuspects (search: string, page: number, limit: number): Observable<any> {
    let query = '?';
    if (limit) {
      query += 'page=' + page + '&limit=' + limit;
    }
    if (search) {
      query += '&search=' + search;
    }
    query += '&isCulprit=' + true;
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.peopleUrl + query, {
      headers: headers
    });
  }

}
