import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course, onDeleteResponce } from '../../../interfaces';
import { UserStoreService } from '../../../user/services/user-store.service'
import { CoursesStoreService } from '../../../services/courses-store.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../shared/constants/routes';
import { take } from 'rxjs';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  @Input() courses: Course[] = [];
  @Input() authors: string[] = [];
  @Input() editable: boolean = this.UserStoreService.isAdmin;

  @Output() showCourse = new EventEmitter<string | undefined>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<boolean>();

  constructor(
    private UserStoreService: UserStoreService, private CourseStoreService: CoursesStoreService, private router: Router
  ) { }


  onShow(id: string | undefined): void {
    this.router.navigate([ROUTES.COURSE_INFO, id]);
  }

  onEditCourse(id: string | undefined) {
    this.router.navigate([ROUTES.COURSE_EDIT, id]);
    this.editCourse.emit(id);
  }

  onDeleteCourse(id: string | undefined) {
    this.CourseStoreService.deleteCourse(id).pipe(take(1)).subscribe({
      next: (res: onDeleteResponce) => {
        if (res.successful) {
          this.deleteCourse.emit(true);
        }
      }
    })

  }
}
