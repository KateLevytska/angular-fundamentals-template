import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() creationDate: Date;
  @Input() duration: number;
  @Input() authors: string[];
  @Input() isEditible: boolean = true;

  @Output() clickOnShow = new EventEmitter<void>();

  constructor() {
    this.title = 'Course Title';
    this.description = 'description';
    this.duration = 0;
    this.creationDate = new Date();
    this.authors = ['Author Name'];
  }

  onShowCourse() {
    this.clickOnShow.emit();
  }
}