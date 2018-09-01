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

  GetReports(page: number = 0, limit: number = 10, tags: string[] = []): Observable<any> {
    let query = '?page=' + page + '&limit=' + limit;
    if (tags.length > 0) {
      query += '&tags' + tags.join(',');
    }
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reportUrl + query, {
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

  GetAttachments (any) {
    return of(any);
  }

}
