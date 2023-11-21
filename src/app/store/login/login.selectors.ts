import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, loginFeatureKey } from './login.reducer';

export const selectLoginState =
  createFeatureSelector<LoginState>(loginFeatureKey);

export const selectUserActive = createSelector(
  selectLoginState,
  (state) => state.userActive
);
export const selectNameUserActive = createSelector(
  selectLoginState,
  (state) => state.userActive?.name
);
