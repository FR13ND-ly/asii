import { createFeature, createReducer, on } from '@ngrx/store';
import { initialAuthState, notAuth } from './auth.state';
import { authActions } from './auth.actions';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(authActions.register, (state) => state),
    on(authActions.loginSuccess, (state, { auth }) => auth),
    on(authActions.loginFail, (state) => notAuth),
    on(authActions.logout, (state) => initialAuthState)
  ),
});

export const { name, reducer, selectAuthState, selectUsername, selectUid } =
  authFeature;
