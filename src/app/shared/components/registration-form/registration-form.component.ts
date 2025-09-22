import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormControl, 
  Validators 
} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name : new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(5)
      ])),
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string[]) {
    this.submitted = true;
    console.log(value);
  }
}
