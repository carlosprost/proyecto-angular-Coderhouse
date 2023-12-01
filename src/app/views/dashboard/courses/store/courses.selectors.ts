import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

export const selectCourses = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.courses
);

export const selectTeachers = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.teachers
);

export const selectIsLoading = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.isLoading
);

export const selectIsAdmin = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.isAdmin
);
