import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree} from '@angular/router';
import { UserStoreService } from "../services/user-store.service";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userStore: UserStoreService) {}

  canActivate(): boolean | UrlTree {
    return this.userStore.isAdmin
      ? true
      : this.router.createUrlTree(['/courses']);
  }
}
