import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { selectUsername } from '../../../state/auth/auth.reducer';
import { Observable } from 'rxjs';
import { FeedbackService } from '../../services/feedback.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'feedback',
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    JsonPipe,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
  fb = inject(FormBuilder);
  feedbackService = inject(FeedbackService);
  store = inject(Store);

  feedbacks$: any = this.feedbackService.getFeedbacks();

  username$: Observable<any> = this.store.select(selectUsername);
  feedbackForm = this.fb.group({
    feedback: ['', Validators.required],
  });
  submit(username: string) {
    if (this.feedbackForm.invalid) {
      return;
    }
    this.feedbackService.sendFeedback({
      username,
      feedback: this.feedbackForm.value.feedback,
    });
    this.feedbackForm.reset();
    this.feedbacks$ = this.feedbackService.getFeedbacks();
  }
}
