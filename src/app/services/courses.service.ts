import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from "rxjs";
import { Courses, Course, CreateCourse, Author, CoursesResponce, CourseResponce, AuthorsResponce, AuthorsResponceAll } from '../interfaces';
import { httpOptions } from '../service.data';
import { BASE_URL, ENDPOINTS } from '../shared/constants/api.constants';
import { SessionStorageService } from "../auth/services/session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    token = this.SessionStorageService.getToken();
        constructor(private http: HttpClient, private SessionStorageService: SessionStorageService) { }

    private getAuthOptions() {
        return {
            headers: httpOptions.headers.set('Authorization', `${this.token}`)
        };
    }

    getAll(): Observable<CoursesResponce> {
        return this.http.get<CoursesResponce>(BASE_URL + ENDPOINTS.COURSES_ALL, httpOptions)
    }

    createCourse(course: CreateCourse) {
        return this.http.post<Course>(BASE_URL + ENDPOINTS.COURSE_ADD, course, this.getAuthOptions())
    }

    editCourse(id: string, course: Course) {
        return this.http.put<Course>(`${BASE_URL}/courses/${id}`, course, this.getAuthOptions());
    }

    getCourse(id: string) {
        return this.http.get<CourseResponce>(`${BASE_URL}/courses/${id}`, httpOptions)
    }

    deleteCourse(id: string | undefined) : any {
        console.log(111)
        return this.http.delete<Course>(`${BASE_URL}/courses/${id}`, this.getAuthOptions())
    }

    filterCourses(value: string) {
        const params = new HttpParams().set('title', value);
    return this.http
      .get<any>(
        `${BASE_URL}${ENDPOINTS.COURSES_FILTER}`, { params })

    }

    getAllAuthors() {
        return this.http.get<AuthorsResponceAll>(BASE_URL + ENDPOINTS.AUTHORS_ALL, httpOptions);
    }

    createAuthor(value: {name: string}) {
        return this.http.post<AuthorsResponce>(BASE_URL + ENDPOINTS.AUTHOR_CREATE, value, this.getAuthOptions())
    }

    getAuthorById(id: string) {
        this.http.get<Author>(`${BASE_URL}${ENDPOINTS.AUTHOR}${id}`, httpOptions)
    }
}

