import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IHost } from '../interface/host/host.interface';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';

@Injectable()
export class HostService {

  private hostUrl = `${environment.API_URL}/api/hosts`;

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

  GetHosts (page: number = 0, limit: number = 10, filter = null): Observable<any> {
    let query = '?limit=' + limit + '&page=' + page;
    if (filter) {
      query += '&filter=' + filter;
    }
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.hostUrl + query, {
      headers: headers
    });
  }

  GetHostById (_id: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.get(this.hostUrl + '/' + _id, {
      headers: headers
    });
  }

  SendHostRequest(_id: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.post(this.hostUrl + '/requests/' + _id, null, {
      headers: headers
    });
  }

  AddNewHost (host: IHost): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.GetSessionToken());
    return this.http.post(this.hostUrl, host, {
      headers: headers
    });
  }
}
