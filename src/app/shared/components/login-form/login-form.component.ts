import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../../auth/services/auth.service";
import { ROUTES } from '../../constants/routes';
import { take } from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    @ViewChild("loginForm") public loginForm!: NgForm;

    constructor(
        private AuthService: AuthService, private router: Router
    ) { }

    onSubmit() {
        this.AuthService.login(this.loginForm.value).pipe(take(1)).subscribe({
            complete: () => {
                this.router.navigate([ROUTES.COURSES])
            }
        });
    }
}