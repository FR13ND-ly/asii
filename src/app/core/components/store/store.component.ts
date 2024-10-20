import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectPpcUpgrades,
  selectPpsUpgrades,
} from '../../../state/user/user.reducer';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Observable } from 'rxjs';
import { UserState } from '../../../state/user/user.state';
import { userActions } from '../../../state/user/user.actions';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'store',
  standalone: true,
  imports: [AsyncPipe, ItemComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent {
  store = inject(Store);

  user$: Observable<UserState> = this.store.select('user');

  upgradePpc(user: any, d: any) {
    if (user.points >= d.cost) {
      this.store.dispatch(
        userActions.update({
          data: {
            ...user,
            points: user.points - d.cost,
            ppcUpgrades: {
              ...user.ppcUpgrades,
              [d.name]: (user.ppcUpgrades as any)[d.name] + 1,
            },
          },
        })
      );
    }
  }

  upgradePps(user: any, d: any) {
    if (user.points >= d.cost) {
      this.store.dispatch(
        userActions.update({
          data: {
            ...user,
            points: user.points - d.cost,
            ppsUpgrades: {
              ...user.ppsUpgrades,
              [d.name]: (user.ppsUpgrades as any)[d.name] + 1,
            },
          },
        })
      );
    }
  }
}
