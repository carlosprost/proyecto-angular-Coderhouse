import { ActionReducerMap } from "@ngrx/store";
import { loginFeatureKey, reducer, LoginState } from "./login/login.reducer";

export interface AppState {
    [loginFeatureKey]: LoginState
}

export const appReducers: ActionReducerMap<AppState> = {
    [loginFeatureKey]: reducer
}