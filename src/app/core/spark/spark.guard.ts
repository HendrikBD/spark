import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, Route, UrlSegment } from '@angular/router';
import * as moment from 'moment';

import { UserService } from '../user/user.service';

@Injectable()
export class SparkGuard implements CanLoad {

  constructor(private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const expiration = this.getJwtExpiration();
    if (!expiration || moment().valueOf() > expiration) {
      this.router.navigate(['login']);
      return false;
    } else return true;
  }

  canActivate(): boolean {
    console.log('can CanActivate?');
    return true;
  }

  getJwtExpiration() {
    return parseInt(localStorage.getItem('jwtExpiration'), 10);
  }

}
