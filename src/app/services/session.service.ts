import { IChangePassword } from './../interface/session/change-password.interface';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { ISessionCreate } from '../interface/session/session-create.interface';
import { IUserNew } from '../interface/user/user-new.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class SessionService {

  private authUrl = environment.API_URL + '/api/auth';
  constructor(
    private http: Http
  ) { }

  Register (userNew: IUserNew): Observable<ISession> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.authUrl + '/signup', userNew, options)
    .map(response => response.json())
    .share()
  }

  Login (sessionCreate: ISessionCreate): Observable<ISession> {
    console.log(this.authUrl);
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.authUrl + '/signin', sessionCreate, options)
    .map(response => response.json())
    .share()
  }

  SessionSave(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  SessionRead(): ISession {
    return JSON.parse(localStorage.getItem('session'));
  }

  SessionDestroy(): void {
    localStorage.clear();
  }

  ChangePassword(changePassword: IChangePassword): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(this.authUrl + '/v1/api/user/password', changePassword, options)
    .map(response => response.json())
    .share();
  }

  ForgotPassword(email: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.authUrl + '/v1/api/user/password', {email}, options)
    .map(response => response.json())
    .share();
  }
}
