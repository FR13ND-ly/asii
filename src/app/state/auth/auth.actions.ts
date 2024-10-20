import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'AUTH',
  events: {
    register: props<{ username: string }>(),
    login: emptyProps(),
    loginSuccess: props<{ auth: any }>(),
    loginFail: emptyProps(),
    logout: emptyProps(),
  },
});
