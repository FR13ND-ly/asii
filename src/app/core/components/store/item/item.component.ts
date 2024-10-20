import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { PricePipe } from '../../../pipes/price.pipe';

@Component({
  selector: 'store-item',
  standalone: true,
  imports: [AsyncPipe, MatButton, PricePipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() name = '';
  @Input() type = '';
  @Input() upgradeCost = 0;
  @Output() upgrade = new EventEmitter();

  store = inject(Store);
  user$ = this.store.select('user');

  onUpgrade(cost: any) {
    this.upgrade.emit({
      name: this.name,
      cost,
    });
  }
}
