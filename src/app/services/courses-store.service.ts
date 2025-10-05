import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { CoursesService } from "./courses.service";
import { CoursesResponse, CreateCourse, AuthorsResponseAll, onDeleteResponse } from '@shared/interfaces/services';
import { Course } from '@shared/interfaces/components';

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

    createCourse(course: CreateCourse): Observable<Course> {
        return this.CoursesService.createCourse(course);
    }

    getCourse(id: string) {
        return this.CoursesService.getSpecificCourse(id)
    }

    editCourse(id: string, course: Course) {
        return this.CoursesService.editCourse(id, course);
    }

    deleteCourse(id: string ): Observable<onDeleteResponse> {
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