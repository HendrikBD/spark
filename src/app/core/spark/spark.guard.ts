import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, Route, UrlSegment } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable()
export class SparkGuard implements CanLoad {

  constructor(private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    this.router.navigate(['login']);
    return false;
  }

  canActivate(): boolean {
    console.log('can CanActivate?');
    return true;
  }

}
