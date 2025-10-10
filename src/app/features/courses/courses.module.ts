import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { InfoComponent } from "@shared/components";

const routes: Routes = [
  { path: '', component: CoursesComponent }
];

@NgModule({
  declarations: [CoursesComponent, CourseListComponent, InfoComponent],
  imports: [
    CommonModule, 
    SharedModule,
    RouterModule.forChild(routes)
]
})
export class CoursesModule {}