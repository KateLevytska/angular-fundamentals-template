import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CourseActions from './courses.actions'
import { CoursesState } from '../index';
import * as CourseSelectors from './courses.selectors';
import { Course } from '@shared/interfaces/components';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    isAllCoursesLoading$ = this.store.select(CourseSelectors.isAllCoursesLoadingSelector);
    isSingleCourseLoading$ = this.store.select(CourseSelectors.isSingleCourseLoadingSelector);
    isSearchingState$ = this.store.select(CourseSelectors.isSearchingStateSelector);
    courses$ = this.store.select(CourseSelectors.getCourses);
    allCourses$ = this.store.select(CourseSelectors.getAllCourses);
    course$ = this.store.select(CourseSelectors.getCourse);
    errorMessage$ = this.store.select(CourseSelectors.getErrorMessage);

    constructor(private store: Store<CoursesState>) { }

    getAllCourses() {
        this.store.dispatch(CourseActions.requestAllCourses())
    }
    getSingleCourse(id: string) {
        this.store.dispatch(CourseActions.requestSingleCourse({ id }))
    }
    getFilteredCourses(searchValue: string) {
        this.store.dispatch(CourseActions.requestFilteredCourses({ title: searchValue }))
    }

    editCourse(body: Course, id: string) {
        this.store.dispatch(CourseActions.requestEditCourse({ course: body, id }))
    }
    createCourse(body: Course) {
        this.store.dispatch(CourseActions.requestCreateCourse({ course: body }))
    }
    deleteCourse(id: string) {
        this.store.dispatch(CourseActions.requestDeleteCourse({ id }))
    }
}
