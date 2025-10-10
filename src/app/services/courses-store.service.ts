import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { CoursesService } from "./courses.service";
import {
    Course,
    CoursesResponse,
    CreateEditCourse,
    AuthorsResponseAll,
    onDeleteResponse
} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private courses$$ = new BehaviorSubject(this.getAll);
    private isLoading$$ = new BehaviorSubject(false);
    courses$ = this.courses$$.asObservable();
    isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    constructor(private CoursesService: CoursesService) { }

    getAll(): Observable<CoursesResponse> {
        return this.CoursesService.getAll();
    }

    createCourse(course: CreateEditCourse): Observable<Course> {
        return this.CoursesService.createCourse(course);
    }

    getCourse(id: string) {
        return this.CoursesService.getCourse(id)
    }

    editCourse(id: string, course: CreateEditCourse) {
        return this.CoursesService.editCourse(id, course);
    }

    deleteCourse(id: string | undefined): Observable<onDeleteResponse> {
        return this.CoursesService.deleteCourse(id);
    }

    filterCourses(value: string): Observable<any> {
        return this.CoursesService.filterCourses(value)
    }

    getAllAuthors(): Observable<AuthorsResponseAll> {
        return this.CoursesService.getAllAuthors()
    }

    createAuthor(value: { name: string }) {
        return this.CoursesService.createAuthor(value);
    }

    getAuthorById(id: string) {
        this.CoursesService.getAuthorById(id);
    }
}
