import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { userActions } from '../user/user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService = inject(UserService);
  lastUpdated = new Date();

  create$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(userActions.create),
        switchMap((data) => {
          return this.userService.addNewUser(data);
        })
      ),
    { dispatch: false }
  );
}
