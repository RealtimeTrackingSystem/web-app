import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { IUser } from 'app/interface';

@Injectable()
export class SessionService {

  private authUrl = environment.API_URL + '/api/auth';
  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }

  Register (userNew: IUserNew): Observable<ISession> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.authUrl + '/signup', userNew, options)
    .map(response => response.json())
    .share()
  }

  Login (sessionCreate: ISessionCreate): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.authUrl + '/signin', sessionCreate, options)
    .map(response => response.json())
    .share()
  }

  Rehydrate (): Observable<any> {
    // const headers = new Headers({ 'Content-Type': 'application/json'});
    // headers.append('Authorization', this.SessionRead().token);
    // const options = new RequestOptions({headers: headers});
    // return this.http.get(this.authUrl + '/rehydrate', options)
    // .map(response => response.json())
    // .share()
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.SessionRead().token);
    return this.httpClient.get(this.authUrl + '/rehydrate', {
      headers: headers
    });
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

  ChangePassword(oldPassword: string, newPassword: string, passwordConfirmation: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.SessionRead().token);
    return this.httpClient.put(this.authUrl + '/password', {
        oldPassword: oldPassword,
        password: newPassword,
        passwordConfirmation: passwordConfirmation
      }, {
        headers: headers
      });
  }

  ForgotPassword(email: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.httpClient.post(this.authUrl + '/password', {
        email: email
      }, {
        headers: headers
      });
  }

  UpdateProfile(user: IUser): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.SessionRead().token);
    return this.httpClient.put(this.authUrl + '/user', user, {
      headers: headers
    });
  }
}
