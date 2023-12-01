import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectUsers = createSelector(
  selectUsersState,
  (state: fromUsers.State) => state.users
);

export const selectUsersIsLoading = createSelector(
  selectUsersState,
  (state: fromUsers.State) => state.isLoading
);
