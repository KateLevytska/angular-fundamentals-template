import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CourseFormComponent } from './course-form.component';

const routes: Routes = [
  { path: '', component: CourseFormComponent }
];

@NgModule({
  declarations: [CourseFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    SharedModule,
    RouterModule.forChild(routes)
]
})
export class CourseFormModule {}
