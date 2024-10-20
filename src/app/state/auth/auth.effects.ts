import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs';
import { authActions } from './auth.actions';
import { userActions } from '../user/user.actions';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  userService = inject(UserService);

  register$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(authActions.register),
        switchMap((data) => {
          return this.authService.addNewAuth(data.username);
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        map((data: any) => {
          this.userService.get(data);
        })
      ),
    { dispatch: false }
  );
}
