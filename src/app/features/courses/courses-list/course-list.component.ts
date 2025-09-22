import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  @Input() courses: any[] = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  onShowCourse(course: any) {
    this.showCourse.emit(course);
  }

  onEditCourse(course: any) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: any) {
    this.deleteCourse.emit(course);
  }
}