import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { CoursesState } from '../index';
import { Course } from '@shared/interfaces/components';

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

const replaceCourse = (arr: Course[], updated: Course): Course[] =>
  arr.map(c => (c.id === updated.id ? updated : c));

export const coursesReducer = createReducer(
  initialState,

  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
    isSearchState: false,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
    errorMessage: "",
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
    isSearchState: true,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: "",
    course, 
    allCourses: replaceCourse(state.allCourses, course),
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: "",
    course,
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  }))
);

export const reducer = (
  state: CoursesState | undefined,
  action: Action
): CoursesState => coursesReducer(state ?? initialState, action);
