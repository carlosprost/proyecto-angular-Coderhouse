import { createReducer, on } from '@ngrx/store';
import { LoginActions } from './login.actions';
import { UserActive } from 'src/app/interfaces/users';


export const loginFeatureKey = 'login'

export interface LoginState {
  userActive: UserActive | null;
}
const initialState: LoginState = {
  userActive: null,
};
export const reducer = createReducer(
  initialState,
  on(LoginActions.login, (state, action) => ({...state, userActive: action.user})),
  on(LoginActions.resetUser, () => initialState)
);