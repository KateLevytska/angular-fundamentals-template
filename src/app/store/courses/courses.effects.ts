import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {
    map,
    mergeMap,
    switchMap,
    Observable,
    of,
    tap
} from "rxjs";
import {
    Actions,
    createEffect,
    ofType
} from '@ngrx/effects';
import * as CoursesActions from './courses.actions';
import { CoursesService } from "@app/services/courses.service";
import { catchError, withLatestFrom } from "rxjs/operators";
import { Course } from "@shared/interfaces/components";
import { CoursesStateFacade } from './courses.facade';


@Injectable()
export class CoursesEffects {
    constructor(
        private CoursesService: CoursesService,
        private actions$: Actions,
        private coursesStateFacade: CoursesStateFacade
    ) { }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() => this.CoursesService.getAll()
                .pipe(
                    map(courses => CoursesActions.requestAllCoursesSuccess({ courses: courses.result })),
                    catchError(error => of(CoursesActions.requestAllCoursesFail({
                        error: error.message || 'Failed to delete course',
                    })))
                )
            )
        ));

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap((action: { id: string }) =>
                this.CoursesService.getSpecificCourse(action.id).pipe(
                    map(course => CoursesActions.requestSingleCourseSuccess({ course: course.result })),
                    catchError(error =>
                        of(
                            CoursesActions.requestSingleCourseFail({
                                error: error.message || 'Failed to delete course',
                            })))
                )
            )
        ));

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap((action: { id: string, course: Course }) =>
                this.CoursesService.editCourse(action.id, action.course)
                    .pipe(
                        map((course) => CoursesActions.requestEditCourseSuccess({ course: course })),
                        catchError(error =>
                            of(
                                CoursesActions.requestEditCourseFail({
                                    error: error.message || 'Failed to delete course',
                                })))
                    )
            )
        ));

    /*deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap((action: { id: string }) =>
                this.CoursesService.deleteCourse(action.id)
                    .pipe(
                        map(() => CoursesActions.requestDeleteCourseSuccess({ id: action.id })),
                        catchError(error =>
                            of(
                                CoursesActions.requestDeleteCourseFail({
                                    error: error.message || 'Failed to delete course',
                                })))
                    )
            )
        )
    );*/

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap((action: {
                course: {
                    title: string;
                    description: string;
                    creationDate: string;
                    duration: number;
                    authors: string[]
                }
            }) =>
                this.CoursesService.createCourse(action.course)
                    .pipe(
                        map((course) =>
                            CoursesActions.requestCreateCourseSuccess({ course: course })),
                        catchError(error =>
                            of(
                                CoursesActions.requestCreateCourseFail({
                                    error: error.message || 'Failed to delete course',
                                })))
                    )
            )
        ));

    redirectToTheCoursesPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CoursesActions.requestEditCourseSuccess,
                CoursesActions.requestCreateCourseSuccess,
                CoursesActions.requestSingleCourseFail
            ),
            map(() => {
                window.history.back();
            })
        ), { dispatch: false });

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            map(([{ title: searchValue }, courses]) => {
                const query = (searchValue ?? '').trim().toLowerCase();

                const filtered = query
                    ? courses.filter(course =>
                        [course.title, course.description].some(searching => searching?.toLowerCase().includes(query))
                    )
                    : courses;

                return CoursesActions.requestFilteredCoursesSuccess({ courses: filtered });
            }),
            catchError(error =>
                of(
                    CoursesActions.requestFilteredCoursesFail({
                        error: error?.message ?? 'Failed to filter courses',
                    })
                )
            )
        )
    );
}
