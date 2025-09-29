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

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<boolean>();

  constructor(
    private UserStoreService: UserStoreService, private CourseStoreService: CoursesStoreService, private router: Router
  ) { }

  onShow(id: string) {
    this.showCourse.emit(id);
  }

  onEdit(course: any) {
    this.editCourse.emit(course);
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
