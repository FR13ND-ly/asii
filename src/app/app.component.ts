import { Component, inject, OnInit, signal } from '@angular/core';
import { InfoComponent } from './core/components/info/info.component';
import { StoreComponent } from './core/components/store/store.component';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectPoints } from './state/user/user.reducer';
import { AsyncPipe, NgIf } from '@angular/common';
import { PricePipe } from './core/pipes/price.pipe';
import { MatDialog } from '@angular/material/dialog';
import { selectUid } from './state/auth/auth.reducer';
import { AuthDialogComponent } from './core/components/auth-dialog/auth-dialog.component';
import { AboutComponent } from './core/components/about/about.component';
import { FeedbackComponent } from './core/components/feedback/feedback.component';
import { TopComponent } from './core/components/top/top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InfoComponent,
    StoreComponent,
    MatButton,
    AsyncPipe,
    PricePipe,
    AboutComponent,
    FeedbackComponent,
    TopComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  dialog = inject(MatDialog);
  selectedView = signal(0);

  points$ = this.store.select(selectPoints);

  auth$ = this.store.select('auth');

  onSelectView(i: number) {
    this.selectedView.set(i);
  }

  ngOnInit(): void {
    this.auth$.subscribe((auth) => {
      if (auth.uid === undefined) return;
      if (!auth!.uid) {
        this.dialog.open(AuthDialogComponent, {
          disableClose: true,
        });
      }
    });
  }
}
