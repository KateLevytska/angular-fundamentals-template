import { Action, createReducer, on } from '@ngrx/store';
import { CoursesState } from '../index';
import * as CoursesActions from './courses.actions';
import { coursesFeatureKey } from './courses.constants'

export const initialState: CoursesState = {
    allCourses : [],
    course : null,
    isAllCoursesLoading : false,
    isSingleCourseLoading : false,
    isSearchState : false,
    errorMessage : null
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
        isSearchState: false
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage:  error
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
        isSearchState: true
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestEditCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),
    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    }))
);



export const reducer = (state: CoursesState, action: Action):
    CoursesState => coursesReducer(state, action);
