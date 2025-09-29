import { Component, OnInit } from '@angular/core';
import { forkJoin, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes';
import { CoursesStoreService } from '../../services/courses-store.service';
import { Course } from '@app/interfaces';
import { UserStoreService } from '../../user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  isAdmin = this.UserStoreService.isAdmin

  constructor(
    public CoursesStoreService: CoursesStoreService, private router: Router, private UserStoreService: UserStoreService
  ) { }

  ngOnInit(): void {
    this.initCoursesAndAuthors();
  }

  onSearchCourses(query: { search: string }): void {
  const term = (query?.search ?? '').trim();

  const courses$ = term
    ? this.CoursesStoreService.filterCourses(term).pipe(map(r => r.result))
    : this.CoursesStoreService.getAll().pipe(map(r => r.result));

  forkJoin({
    courses: courses$,
    authors: this.CoursesStoreService.getAllAuthors().pipe(map(r => r.result))
  })
    .pipe(take(1))
    .subscribe({
      next: ({ courses, authors }) => {
        const byId = new Map(authors.map(author => [author.id, author.name] as const));
        this.courses = courses.map((course: Course) => ({
          ...course,
          authors: course.authors.map((id: string) => byId.get(id) ?? 'Unknown')
        }));
      },
      error: (err) => console.error('Search failed:', err)
    });
}

  initCoursesAndAuthors(): void {
    forkJoin({
      courses: this.CoursesStoreService.getAll().pipe(map(r => r.result)),
      authors: this.CoursesStoreService.getAllAuthors().pipe(map(r => r.result))
    }).pipe(take(1)).subscribe(({ courses, authors }) => {
      const byId = new Map(authors.map(author => [author.id, author.name] as const));
      this.courses = courses.map(course => ({
        ...course,
        authors: course.authors.map(id => byId.get(id) ?? 'Unknown')
      }));
    });
  }

  editCourse(id: string) {
    return this.router.navigate([`/courses/edit/${id}`]);
  }
  showCourse(id: string) {
    return this.router.navigate([`/courses/${id}`]);
  }


  onDeleteCourse() {
    this.initCoursesAndAuthors();
  }
}
