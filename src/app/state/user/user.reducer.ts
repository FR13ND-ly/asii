import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { userInitState, UserState } from './user.state';
import { act } from '@ngrx/effects';

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    userInitState,
    on(
      userActions.create,
      (state: UserState, action: { uid: string }) => state
    ),
    on(userActions.get, (state: UserState) => state),
    on(userActions.update, (state: UserState, action: { data: UserState }) => {
      return { ...action.data };
    }),
    on(
      userActions.addPoints,
      (state: UserState, action: { points: number }) => {
        let points = state.points + action.points;
        return { ...state, points };
      }
    ),
    on(
      userActions.minusPoints,
      (state: UserState, action: { points: number }) => {
        let points = state.points - action.points;
        return { ...state, points };
      }
    )
  ),
});

export const {
  name,
  reducer,
  selectPoints,
  selectPpcUpgrades,
  selectPpsUpgrades,
} = userFeature;
