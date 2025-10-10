import {
    Component,
    OnInit
} from '@angular/core';
import {
    forkJoin,
    map,
    take
} from 'rxjs';
import {Router} from '@angular/router';
import {CoursesStoreService} from '@app/services/courses-store.service';
import {Course} from '@app/interfaces';
import {ROUTES} from "@shared/constants/routes";
import {UserStoreService} from '@app/user/services/user-store.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    courses: Course[] = [];
    isAdmin = this.UserStoreService.isAdmin

    constructor(
        public CoursesStoreService: CoursesStoreService,
        private router: Router,
        private UserStoreService: UserStoreService
    ) {
    }

    ngOnInit(): void {
        this.initCoursesAndAuthors();
    }

    onSearchCourses(query: { search: string }): void {
        const term = (query?.search ?? '').trim();

        const courses$ = term
            ? this.CoursesStoreService.filterCourses(term).pipe(map(
                response => response.result
            ))
            : this.CoursesStoreService.getAll().pipe(map(
                response => response.result
            ));

        forkJoin({
            courses: courses$,
            authors: this.CoursesStoreService.getAllAuthors().pipe(map(
                response => response.result
            ))
        })
            .pipe(take(1))
            .subscribe({
                next: ({courses, authors}) => {
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
            courses: this.CoursesStoreService.getAll()
                .pipe(map(
                    response => response?.result ?? []
                )),
            authors: this.CoursesStoreService.getAllAuthors()
                .pipe(map(
                    response => response?.result ?? []
                )),
        })
            .pipe(take(1))
            .subscribe(({courses, authors}) => {
                const idToName = new Map<string, string>(
                    authors.map(author => [String(author.id), author.name])
                );
                const nameSet = new Set<string>(authors.map(author => author.name));
                const resolveAuthor = (token: unknown): string => {
                    const key = String(token);
                    const byId = idToName.get(key);
                    if (byId) return byId;
                    if (nameSet.has(key)) return key;
                    return 'Unknown';
                };

                this.courses = courses.map((course: Course) => ({
                    ...course,
                    authors: Array.isArray(course?.authors)
                        ? course.authors.map(resolveAuthor)
                        : []
                }));
            });
    }

    editCourse(id: string) {
        return this.router.navigate([`${ROUTES.COURSE_EDIT}/${id}`]);
    }

    showCourse(id: string) {
        return this.router.navigate([`${ROUTES.COURSES}/${id}`]);
    }


    onDeleteCourse() {
        this.initCoursesAndAuthors();
    }
}
