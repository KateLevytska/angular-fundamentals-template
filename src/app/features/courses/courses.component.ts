import { 
    Component, 
    OnInit, 
    OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@shared/constants/routes';
import { 
    Course, 
    Author 
} from '@shared/interfaces/components';

import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { CoursesStoreService } from '@app/services/courses-store.service';

import { 
    combineLatest, 
    Subject 
} from 'rxjs';
import { 
    map, 
    shareReplay, 
    takeUntil 
} from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  isAdmin = false;

  private destroy$ = new Subject<void>();

  private authors$ = this.CoursesStoreService.getAllAuthors().pipe(
    map((item: { result: Author[] }) => item.result),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private router: Router,
    private UserStoreService: UserStoreService,
    private CoursesStateFacade: CoursesStateFacade,
    private CoursesStoreService: CoursesStoreService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.UserStoreService.isAdmin;

    this.CoursesStateFacade.getAllCourses();

    combineLatest([
      this.CoursesStateFacade.courses$,
      this.authors$,
    ])
      .pipe(
        map(([courses, authors]) => {
          const byId = new Map(authors.map(author => [author.id, author.name] as const));
          return courses.map(course => ({
            ...course,
            authors: course.authors.map(id => byId.get(id) ?? 'Unknown'),
          }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((courses) => (this.courses = courses));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchCourses(query: { search: string }): void {
    const term = (query?.search ?? '').trim();

    if (term) {
      this.CoursesStateFacade.getFilteredCourses(term);
    } else {
      this.CoursesStateFacade.getAllCourses();
    }
  }

  editCourse(id: string): void {
    this.router.navigate([`${ROUTES.COURSE_EDIT}/${id}`]);
  }

  showCourse(id: string): void {
    this.router.navigate([`${ROUTES.COURSES}/${id}`]);
  }
  onDeleteCourse(id: string): void {
    this.CoursesStateFacade.deleteCourse(id);
  }
}
