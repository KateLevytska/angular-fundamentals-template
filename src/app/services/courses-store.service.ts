import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, catchError, tap, finalize, of } from "rxjs";
import { CoursesService } from "./courses.service";
import { Courses, Course, CoursesResponce, AuthorsResponce, CreateCourse, AuthorsResponceAll, CourseDeleteResponce, onDeleteResponce } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private courses$$ = new BehaviorSubject(this.getAll);
    private isLoading$$ = new BehaviorSubject(false);
    courses$ = this.courses$$.asObservable();
    isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    constructor(private CoursesService: CoursesService) { }

    getAll(): Observable<CoursesResponce> {
        return this.CoursesService.getAll();
    }

    createCourse(course: CreateCourse): Observable<Course> {
        return this.CoursesService.createCourse(course);
    }

    getCourse(id: string) {
        return this.CoursesService.getCourse(id)
    }

    editCourse(id: string, course: Course) {
        return this.CoursesService.editCourse(id, course);
    }

    deleteCourse(id: string | undefined): Observable<onDeleteResponce> {
        return this.CoursesService.deleteCourse(id);
    }

    filterCourses(value: string): Observable<any> {
        return this.CoursesService.filterCourses(value)
    }

    getAllAuthors(): Observable<AuthorsResponceAll> {
        return this.CoursesService.getAllAuthors()
    }

    createAuthor(value: { name: string }) {
        return this.CoursesService.createAuthor(value);
    }

    getAuthorById(id: string) {
        this.CoursesService.getAuthorById(id);
    }
}
