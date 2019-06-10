import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../types/management/user.type';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ) {
    return this.http.post<User>('/login', {email, password});
  }

  createAccount(email: string, password: string ) {
    return this.http.post<User>('/api/create-account', {email, password}).subscribe(res => {
      console.log('account created');
      console.log(res);
    });
  }
}
