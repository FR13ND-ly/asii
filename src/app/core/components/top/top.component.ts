import { Component, inject } from '@angular/core';
import { UserService } from '../../../state/user/user.service';
import { AsyncPipe } from '@angular/common';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'top',
  standalone: true,
  imports: [AsyncPipe, PricePipe],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
})
export class TopComponent {
  userService = inject(UserService);

  top$ = this.userService.getTopUsers();
}
