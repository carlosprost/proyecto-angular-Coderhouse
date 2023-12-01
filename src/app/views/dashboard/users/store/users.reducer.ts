import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { User } from 'src/app/interfaces/users';

export const usersFeatureKey = 'users';

export interface State {
  isLoading: boolean;
  users: User[];
  error: any;
}

export const initialState: State = {
  isLoading: false,
  users: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUserss, (state) => state),
  on(UsersActions.loadUserssSuccess, (state, { users }) => ({
    ...state,
    isLoading: false,
    users: users,
  })),
  on(UsersActions.loadUserssFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  //create user
  on(UsersActions.createUserFailure, (state, {error}) => ({...state, error: error})),
  //update user
  on(UsersActions.updateUserFailure, (state, {error}) => ({...state, error: error})),
  //delete user
  on(UsersActions.deleteUserFailure, (state, {error}) => ({...state, error: error})),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});
