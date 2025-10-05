import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CoursesState } from "@app/store";

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isAllCoursesLoading,
);

export const isSearchingStateSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isSearchState,
);

export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isSingleCourseLoading,
);

export const getCourses = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.allCourses,
);

export const getAllCourses = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.allCourses,
);

export const getCourse = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.course,
);

export const getErrorMessage = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.errorMessage,
);