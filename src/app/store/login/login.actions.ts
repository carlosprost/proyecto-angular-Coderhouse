import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserActive } from "src/app/interfaces/users";

export const LoginActions = createActionGroup({
    source: 'Login',
    events: {
        login: props<{ user: UserActive }>(),
        resetUser: emptyProps()
    }
})