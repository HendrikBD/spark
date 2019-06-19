import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearers ' + idToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
