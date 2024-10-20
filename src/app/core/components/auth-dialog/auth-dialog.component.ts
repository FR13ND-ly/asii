import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '../../../material.module';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { userActions } from '../../../state/user/user.actions';
import { authActions } from '../../../state/auth/auth.actions';
import { filter } from 'rxjs';
import { AuthService } from '../../../state/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
})
export class AuthDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef);
  authService = inject(AuthService);
  store = inject(Store);
  snackbar = inject(MatSnackBar);

  fb = new FormBuilder();
  view = signal(0);

  usernameForm = new FormControl('', Validators.required);
  tokenForm = new FormControl('', Validators.required);

  token = signal('');

  ngOnInit() {
    this.store
      .select('auth')
      .pipe(filter((data) => data!.uid))
      .subscribe((data) => {
        this.token.set(data.uid);
      });
  }

  copy() {
    navigator.clipboard.writeText(this.token());
  }

  onCreateAccount() {
    this.view.set(2);
    this.store.dispatch(
      authActions.register({ username: this.usernameForm.value! })
    );
  }

  async onEnterAccount() {
    if (this.tokenForm.invalid) return;
    if (await this.authService.checkExists(this.tokenForm.value!)) {
      this.dialogRef.close();
    } else {
      this.snackbar.open('Invalid token', 'Close');
    }
  }
}
