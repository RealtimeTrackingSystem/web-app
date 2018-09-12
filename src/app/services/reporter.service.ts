import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IReporter } from '../interface/reporter/reporter.interface';
import { SessionService } from './session.service';
import { environment } from './../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReporterService {

  private reporterUrl = environment.API_URL + `/api/reporters`;
  private hostUrl = environment.API_URL + `/api/hosts`;

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

  GetReporterById(_id: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reporterUrl + '/' + _id, {
      headers: headers
    });
  }

  GetReporters(): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.reporterUrl, {
      headers: headers
    });
  }

  GetHostPendingRequest(hostID: string, page = 0, limit = 10): Observable<any> {
    const query = '?page=' + page + '&limit=' + limit;
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.hostUrl + '/requests/' + hostID + query, {
      headers: headers
    });
  }

  AcceptUserRequest (hostId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.put(this.hostUrl + '/requests/' + hostId, {
        userId: userId
      }, {
        headers: headers
      });
  }
}
