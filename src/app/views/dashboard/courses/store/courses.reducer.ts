import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from 'src/app/interfaces/courses';
import { Teacher } from 'src/app/interfaces/teachers';

export const coursesFeatureKey = 'courses';
export const teachersCoursesFeatureKey = 'teachers';

export interface State {
  isLoading: boolean;
  courses: Course[];
  teachers: Teacher[];
  isAdmin: boolean;
  error: any;
}

export const initialState: State = {
  isLoading: false,
  courses: [],
  teachers: [],
  isAdmin: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => ({ ...state, isLoading: true })),
  on(
    CoursesActions.loadCoursesSuccess,
    (state, { courses, teachers, isAdmin }) => ({
      ...state,
      isLoading: false,
      courses: courses,
      teachers: teachers,
      isAdmin: isAdmin,
    })
  ),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(CoursesActions.createCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(CoursesActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});
