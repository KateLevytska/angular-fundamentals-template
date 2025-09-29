import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() creationDate: string;
  @Input() duration: number;
  @Input() authors: string[];
  @Input() isEditible: boolean = true;


  constructor() {
    this.title = 'Course Title';
    this.description = 'description';
    this.duration = 0;
    this.creationDate = (new Date()).toDateString();
    this.authors = ['Author Name'];
  }
}