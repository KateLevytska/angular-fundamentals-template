import { ActionReducerMap } from "@ngrx/store";
import { Course } from "@shared/interfaces/components";
import { coursesReducer } from "@app/store/courses/courses.reducer";
import { CoursesEffects } from "@app/store/courses/courses.effects";

export interface CoursesState {
    allCourses : Course[],
    course : Course | null,
    isAllCoursesLoading : boolean,
    isSingleCourseLoading : boolean,
    isSearchState : boolean,
    errorMessage : string | null
}

export interface State {
    courses: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
    courses: coursesReducer,
};

export const effects = [CoursesEffects];