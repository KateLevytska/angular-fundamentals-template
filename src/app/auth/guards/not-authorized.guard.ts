import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '@app/auth/services/auth.service';
import { ROUTES } from '@shared/constants/routes';

@Injectable({
    providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    canActivate(): boolean | UrlTree {
        return this.authService.isAuthorised
            ? this.router.createUrlTree([ROUTES.COURSES])
            : true;
    }
}