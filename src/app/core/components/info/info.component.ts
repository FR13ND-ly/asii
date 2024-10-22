import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { UserState } from '../../../state/user/user.state';
import { PpcPipe } from '../../pipes/ppc.pipe';
import { PpsPipe } from '../../pipes/pps.pipe';
import { userActions } from '../../../state/user/user.actions';
import { selectPpsUpgrades } from '../../../state/user/user.reducer';
import { examples } from '../../utils/code';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'info',
  standalone: true,
  imports: [AsyncPipe, PpcPipe, PpsPipe, PricePipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  providers: [PpcPipe, PpsPipe],
})
export class InfoComponent implements OnInit, OnDestroy {
  store = inject(Store);
  ppcPipe = inject(PpcPipe);
  ppsPipe = inject(PpsPipe);

  user$: Observable<UserState> = this.store.select('user');
  subscription!: Subscription;

  pps: any;

  written = signal(0);
  selectedCode = signal(0);
  code = signal('');
  codeExamples = examples;

  click(user: UserState) {
    let ppc = this.ppcPipe.transform(user.ppcUpgrades);
    this.store.dispatch(userActions.addPoints({ points: ppc }));
    this.updateCode(ppc);
  }

  ngOnInit(): void {
    this.store.select(selectPpsUpgrades).subscribe((ppsUpgrades: any) => {
      this.pps = this.ppsPipe.transform(ppsUpgrades);
    });
    this.subscription = interval(1000).subscribe(() => {
      if (this.pps < 1) return;
      this.store.dispatch(userActions.addPoints({ points: this.pps }));
      this.updateCode(this.pps);
    });
  }

  updateCode(count: any) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (this.written() >= this.codeExamples[this.selectedCode()].length) {
          this.code.set('');
          this.selectedCode.update((d) => (d + 1) % this.codeExamples.length);
          this.written.set(0);
        }
        this.code.update(
          (d) => d + this.codeExamples[this.selectedCode()][this.written()]
        );
        this.written.set(this.written() + 1);
      }, i * 10);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
