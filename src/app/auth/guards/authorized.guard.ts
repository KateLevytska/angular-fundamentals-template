import { Injectable, inject } from '@angular/core';
import { CanLoad, CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '@app/auth/services/auth.service';
import { ROUTES } from '@shared/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad, CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canLoad(): boolean | UrlTree {
    return this.checkAuth();
  }

  canActivate(): boolean | UrlTree {
    return this.checkAuth();
  }

  private checkAuth(): boolean | UrlTree {
    return this.authService.isAuthorised ?
    this.authService.isAuthorised
      : this.router.createUrlTree([ROUTES.LOGIN]);
  }
}
