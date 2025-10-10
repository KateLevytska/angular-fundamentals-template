import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {CoursesStoreService} from '@app/services/courses-store.service';
import {
    forkJoin,
    map,
    take
} from 'rxjs';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import {
    AuthorsResponse,
    Author,
    AuthorsResponseAll,
    Course
} from '@app/interfaces';
import {ROUTES} from '../../constants/routes';


@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    courseForm!: FormGroup;
    textButton = 'Create course';
    formSubmitted = false;
    id = this.route.snapshot.paramMap.get('id')!;
    currentCourse?: Course;

    allAuthors: Author[] = [];
    courseAuthors: Author[] = [];
    createdAuthorsByUser: Author[] = [];

    constructor(
        private readonly formBuilder: FormBuilder,
        public readonly iconLibrary: FaIconLibrary,
        private CoursesStoreService: CoursesStoreService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        iconLibrary.addIconPacks(fas);
    }

    ngOnInit(): void {
        this.buildForm();
        this.CoursesStoreService.getAllAuthors()
            .pipe(take(1))
            .subscribe((e: AuthorsResponseAll) => {
                this.allAuthors = e.result
            });
        if (this.id) {
            this.textButton = 'Update Course';
            forkJoin({
                currentCourse: this.CoursesStoreService.getCourse(this.id)
                    .pipe(map(
                        response => response.result
                    )),
                authors: this.CoursesStoreService.getAllAuthors()
                    .pipe(map(
                        response => response.result
                    ))
            }).pipe(take(1)).subscribe(({currentCourse, authors}) => {
                this.courseForm.controls['textForm'].patchValue({...currentCourse});
                this.currentCourse = currentCourse;
                const allAuthorsMap = new Map(
                    authors.map((author: Author) => [author.name, author.id] as const)
                );
                const namesToAuthorsArr = currentCourse.authors
                    .map((name: string) => ({
                        id: allAuthorsMap.get(name),
                        name: name
                    }))

                namesToAuthorsArr
                    .filter((el) => typeof el.id === 'string')
                    .forEach((el) => this.addCourseAuthor(el as Author));
            })
        }
    }

    private buildForm(): void {
        this.courseForm = this.formBuilder.group({
            textForm: this.formBuilder.group({
                title: [
                    '',
                    [Validators.required, Validators.minLength(2)],
                ],
                description: [
                    '',
                    [Validators.required, Validators.minLength(2)],
                ],
                duration: [
                    '',
                    [Validators.required, Validators.min(0)],
                ],
            }),
            authorsForm: this.formBuilder.group({
                authorName: [
                    '',
                    [
                        Validators.minLength(2),
                        Validators.pattern(/^[A-Za-z0-9 ]+$/),
                    ],
                ],
            }),
            courseAuthors: this.formBuilder.array<FormControl<string>>([]),
        });
    }

    get authorNameControl(): FormControl<string | null> {
        return this.courseForm.get('authorsForm.authorName') as FormControl<
            string | null
        >;
    }

    get titleNameControl(): FormControl<string | null> {
        return this.courseForm.get('textForm.title') as FormControl<
            string | null
        >;
    }

    get descriptionNameControl(): FormControl<string | null> {
        return this.courseForm.get('textForm.description') as FormControl<
            string | null
        >;
    }

    get durationNameControl(): FormControl<string | null> {
        return this.courseForm.get('textForm.duration') as FormControl<
            string | null
        >;
    }


    get allAuthorsForView(): Author[] {
        return [...this.allAuthors, ...this.createdAuthorsByUser];
    }

    get normalizedDurationValue(): number {
        const value = this.courseForm.get('textForm.duration')?.value as number;
        return value > 0 ? value : 0;
    }

    createAuthor(): void {
        if (!this.authorNameControl.value || this.authorNameControl.invalid) return;
        const payload = {name: this.authorNameControl.value};

        this.CoursesStoreService.createAuthor(payload).pipe(take(1))
            .subscribe((result: AuthorsResponse) => {
                this.createdAuthorsByUser = [result.result, ...this.createdAuthorsByUser];
            })

        this.authorNameControl.reset('');
    }

    get courseAuthorsFA(): FormArray<FormControl<string>> {
        return this.courseForm.get('courseAuthors') as FormArray<FormControl<string>>;
    }

    addCourseAuthor(author: Author): void {
        const alreadyExists = this.courseAuthors
            .some(item => item.id === author.id);
        if (alreadyExists) {
            return;
        }

        this.courseAuthors = [...this.courseAuthors, author];
        this.courseAuthorsFA.push(this.formBuilder.nonNullable.control(author.id));
    }

    removeCourseAuthor(author: Author): void {
        this.courseAuthors = this.courseAuthors
            .filter(item => item.id !== author.id);

        const index = this.courseAuthorsFA.controls
            .findIndex(course => course.value === author.id);
        if (index !== -1) {
            this.courseAuthorsFA.removeAt(index);
        }
    }

    onSubmit(): void {
        this.formSubmitted = true;
        if (this.id) {
            const payloadCurrentCourse: {
                title: string;
                description: string;
                duration: number;
                authors: string[];
                id: string
            } = {
                title: this.courseForm.value.textForm.title,
                description: this.courseForm.value.textForm.description,
                duration: this.courseForm.value.textForm.duration,
                authors: this.courseAuthorsFA.value,
                id: this.id
            };
            this.CoursesStoreService.editCourse(this.id, payloadCurrentCourse)
                .pipe(take(1)).subscribe({
                complete: () => {
                    this.router.navigate([ROUTES.COURSES])
                }
            })
        } else {
            const payload = {
                title: this.courseForm.value.textForm.title as string,
                description: this.courseForm.value.textForm.description,
                duration: this.courseForm.value.textForm.duration,
                authors: this.courseAuthorsFA.value
            };
            this.CoursesStoreService.createCourse(payload)
                .pipe(take(1))
                .subscribe({
                    complete: () => {
                        this.router.navigate([ROUTES.COURSES])
                    }
                })
        }
    }
}
