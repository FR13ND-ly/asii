import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserState } from './user.state';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    create: props<{ uid: string }>(),
    get: emptyProps(),
    update: props<{ data: UserState }>(),
    addPoints: props<{ points: number }>(),
    minusPoints: props<{ points: number }>(),
  },
});
