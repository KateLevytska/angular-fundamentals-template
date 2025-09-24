import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { mockedAuthorsList } from '../../mocks/mocks';

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseComponent implements OnInit {
  public courseForm!: FormGroup;
  public formSubmitted = false;

  public mockedAuthors: Author[] = mockedAuthorsList;
  public courseItems: Author[] = [];

  public createdAuthorsByUser: Author[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly iconLibrary: FaIconLibrary
  ) {
    iconLibrary.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.buildForm();
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
      courseItems: this.formBuilder.array<FormControl<string>>([]),
    });
  }

  public get authorNameControl(): FormControl<string | null> {
    return this.courseForm.get('authorsForm.authorName') as FormControl<
      string | null
    >;
  }

  public get titleNameControl(): FormControl<string | null> {
    return this.courseForm.get('textForm.title') as FormControl<
      string | null
    >;
  }

  public get descriptionNameControl(): FormControl<string | null> {
    return this.courseForm.get('textForm.description') as FormControl<
      string | null
    >;
  }

  public get durationNameControl(): FormControl<string | null> {
    return this.courseForm.get('textForm.duration') as FormControl<
      string | null
    >;
  }


  public get allAuthorsForView(): Author[] {
    return [...this.mockedAuthors, ...this.createdAuthorsByUser];
  }

  public get normalizedDurationValue(): number {
    const value = this.courseForm.get('textForm.duration')?.value as number;
    return value > 0 ? value : 0;
  }

  public createAuthor(): void {
    this.authorNameControl.markAsTouched();

    const rawInput = (this.authorNameControl.value ?? '').trim();
    if (!rawInput || this.authorNameControl.invalid) return;

    const newAuthor: Author = {
      id: crypto.randomUUID(),
      name: rawInput,
    };

    this.createdAuthorsByUser = [newAuthor, ...this.createdAuthorsByUser];

    this.authorNameControl.reset('');
  }

  public get courseItemsFA(): FormArray<FormControl<string>> {
    return this.courseForm.get('courseItems') as FormArray<FormControl<string>>;
  }

  public addCourseItem(author: Author): void {
    const alreadyExists = this.courseItems.some(item => item.id === author.id);
    if (alreadyExists) {
      return;
    }

    this.courseItems = [...this.courseItems, author];
    this.courseItemsFA.push(this.formBuilder.nonNullable.control(author.id));
  }

  public removeCourseItem(author: Author): void {
    this.courseItems = this.courseItems.filter(item => item.id !== author.id);

    const index = this.courseItemsFA.controls.findIndex(c => c.value === author.id);
    if (index !== -1) {
      this.courseItemsFA.removeAt(index);
    }
  }

  public onSubmit(): void {
    this.formSubmitted = true;
    const payload = {
      ...this.courseForm.value,
      courseItems: this.courseItemsFA.value,
    };
    console.log('Form submit payload:', payload);
  }
}
