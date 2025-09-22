import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
@Input()  title: string = 'Course Title';
@Input() description: string = 'description';
@Input() id: string = '';
@Input() creationDate: Date = new Date();
@Input() duration: number  = 0;
@Input() authors: string[]   = ['Author Name'];
@Input() isEditible: boolean = true;
@Input() isShowBackButton: boolean = true;

}
