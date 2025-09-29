import { Component, OnInit } from '@angular/core';
import { forkJoin, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes';
import { CoursesStoreService } from '../../services/courses-store.service';
import { Course } from '@app/interfaces';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    public CoursesStoreService: CoursesStoreService, private router: Router
  ) { }

  ngOnInit(): void {
    this.initCoursesAndAuthors();
  }

  onSearchCourses(query: {search: string}): void {
    console.log(query.search)
 
      this.CoursesStoreService.filterCourses(query.search).pipe(take(1)).subscribe((res) => {
        console.log(res)
      }
      );
    
  }

  initCoursesAndAuthors(): void {
    forkJoin({
      courses: this.CoursesStoreService.getAll().pipe(map(r => r.result)),
      authors: this.CoursesStoreService.getAllAuthors().pipe(map(r => r.result))
    }).pipe(take(1)).subscribe(({ courses, authors }) => {
      const byId = new Map(authors.map(a => [a.id, a.name] as const));
      this.courses = courses.map(course => ({
        ...course,
        authors: course.authors.map(id => byId.get(id) ?? 'Unknown')
      }));
    });
  }

  onDeleteCourse() {
    this.initCoursesAndAuthors();
  }
}
