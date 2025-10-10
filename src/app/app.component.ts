import {
    Component,
    OnInit
} from '@angular/core';
import {
    take,
    filter,
    startWith,
    pairwise
} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth/services/auth.service';
import {UserStoreService} from './user/services/user-store.service';
import {ROUTES} from '@shared/constants/routes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'courses-app';
    isLoggedIn = false;
    isAdmin = false;
    userName$ = this.UserStoreService.name$;


    constructor(
        private AuthService: AuthService,
        private UserStoreService: UserStoreService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.UserStoreService.name$
            .pipe(take(1))
            .subscribe({
                next: (res) => console.log('User name:', res),
            });
        this.AuthService.isAuthorized$
            .pipe(
                startWith(false),
                pairwise(),
                filter(([prev, curr]) => !prev && curr)
            )
            .subscribe(() => {
                this.UserStoreService.getUser().subscribe(
                    {
                        next: (res) => {
                            this.UserStoreService.setName = res.result.name;
                            this.UserStoreService.isAdmin = res.result.role === 'admin';
                            this.router.navigate([this.UserStoreService.getCourseUrl()], {replaceUrl: true});
                        },
                        error: (err) => {
                            this.AuthService.removeToken();
                            this.UserStoreService.setName = '';
                            this.UserStoreService.isAdmin = false;
                            this.router.navigate([ROUTES.LOGIN], {replaceUrl: true});
                        }
                    }
                );
            });

        this.AuthService.isAuthorized$
            .subscribe(isAuth => {
                this.isLoggedIn = isAuth;

                if (!isAuth) {
                    this.router.navigate([ROUTES.LOGIN], {replaceUrl: true});
                    this.UserStoreService.setName = '';
                    this.UserStoreService.isAdmin = false;
                }
            });
    }

    handleLogout() {
        this.AuthService.removeToken();
        this.isAdmin = false;
        this.router.navigate([ROUTES.LOGIN], {replaceUrl: true});
    }
}
