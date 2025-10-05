import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, Observable, take } from 'rxjs';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CourseResponse, AuthorsResponseAll } from '@shared/interfaces/services';
import { Author, Course } from '@shared/interfaces/components';

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
        /* this.id = this.route.snapshot.paramMap.get('id')!;

        forkJoin({
            course: this.coursesStore.getCourse(this.id).pipe(map((result: CourseResponse) => result.result)),
            authors: this.coursesStore.getAllAuthors().pipe(map((result: AuthorsResponseAll) => result.result))
        })
            .pipe(take(1))
            .subscribe(({ course, authors }) => {
                const byId = new Map(authors.map(a => [a.id, a.name] as const));
                this.course = {
                    ...course,
                    creationDate: String(course.creationDate),
                    authors: course.authors.map(id => byId.get(id) ?? 'Unknown')
                };
            }); */
    }
}