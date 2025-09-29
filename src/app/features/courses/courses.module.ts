import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  { path: '', component: CoursesComponent }
];

@NgModule({
  declarations: [CoursesComponent, CourseListComponent],
  imports: [
    CommonModule, 
    SharedModule,
    RouterModule.forChild(routes)
]
})
export class CoursesModule {}