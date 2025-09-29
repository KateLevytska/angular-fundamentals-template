import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../../auth/services/auth.service";
import { ROUTES } from '../../constants/routes';
import { take } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(
      private AuthService: AuthService, private router: Router
    ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(5)
      ])),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public get nameControl(): FormControl<string | null> {
    return this.registrationForm.get('name') as FormControl<
      string | null
    >;
  }

  public get passwordControl(): FormControl<string | null> {
    return this.registrationForm.get('password') as FormControl<
      string | null
    >;
  }


  public get emailControl(): FormControl<string | null> {
    return this.registrationForm.get('email') as FormControl<
      string | null
    >;
  }

  onSubmit() {
    this.submitted = true;
    this.AuthService.register(this.registrationForm.value).pipe(take(1)).subscribe({
      next:(e) => this.router.navigate([ ROUTES.LOGIN ])
    });
  }
}
