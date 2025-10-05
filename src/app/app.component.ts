import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';
import { ROUTES } from '@shared/constants/routes';
import { Router } from '@angular/router';
import { take, tap, throwError } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'courses-app';
    isLoggedIn = false;
    isAdmin = this.UserStoreService.isAdmin;
    userName$ = this.UserStoreService.name$;


    constructor(
        private AuthService: AuthService,
        private UserStoreService: UserStoreService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.UserStoreService.name$
            .pipe(take(1))
            .subscribe(
            {
                next: (res) => {
                    console.log(res)
                }

            }
        )
        this.AuthService.isAuthorized$.subscribe(isAuth => {
            this.isLoggedIn = isAuth;
            if (isAuth) {
                this.UserStoreService.getUser();
            } else {
                this.router.navigate([ROUTES.LOGIN], { replaceUrl: true });
                this.UserStoreService.setName = '';
            }
        });
    }

    handleLogout() {
        this.AuthService.removeToken();
        this.UserStoreService.isAdmin = false;
        this.router.navigate([ROUTES.LOGIN], { replaceUrl: true });
    }
}