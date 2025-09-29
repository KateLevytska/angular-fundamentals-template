import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { CoursesStoreService } from '../../services/courses-store.service';
import { CourseResponce } from '@app/interfaces';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string;     // з API як string
  authors: string[];        // IDs
}
interface Author { id: string; name: string; }
interface CourseResp { successful: boolean; result: Course; }
interface AuthorsResp { successful: boolean; result: Author[]; }

const EMPTY_COURSE: Course = {
  id: '',
  title: '',
  description: '',
  duration: 0,
  creationDate: '',
  authors: []
};

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})

export class CourseInfoComponent {
id: string = '';
isShowBackButton: boolean = true;

  authors$!: Observable<Author[]>;
  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.coursesStore.getCourse(this.id).subscribe(
      (res: CourseResponce) => this.course = res.result
    );
    this.coursesStore.getAllAuthors().subscribe();
  }
}
