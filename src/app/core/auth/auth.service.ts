import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from '../user/user.type';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ) {
    return this.http.post<User>('/login', {email, password}).pipe(tap(res => this.setSession));
  }

  createAccount(email: string, password: string ) {
    return this.http.post<User>('/api/create-account', {email, password}).subscribe(res => {
      console.log('account created');
      console.log(res);
    });
  }

  private setSession(authResult) {
    console.log('set session');
    console.log(authResult);
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
