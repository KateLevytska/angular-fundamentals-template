import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LoginFormComponent } from './login-form.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent }
];

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule, 
    SharedModule, 
    FormsModule, 
    RouterModule.forChild(routes)
]
})
export class LoginModule {}
