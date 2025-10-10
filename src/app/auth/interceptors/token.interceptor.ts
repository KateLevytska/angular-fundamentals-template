import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { AuthService } from '@app/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly sessionStorage = inject(SessionStorageService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sessionStorage.getToken();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: token } })
      : req;

    return next
      .handle(authReq)
      .pipe(catchError(this.handleHttpError.bind(this)));
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 || error.status === 403) {
      this.authService.logout()
    }
    return throwError(() => error);
  }
}