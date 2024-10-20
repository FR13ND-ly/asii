import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  firestore = inject(Firestore);
  collection = collection(this.firestore, 'feedback');

  async getFeedbacks() {
    let q = query(this.collection, orderBy('date', 'desc'));
    return (await getDocs(q)).docs;
  }

  async sendFeedback(data: any) {
    let feedback = {
      date: new Date(),
      ...data,
    };
    await addDoc(this.collection, feedback);
  }
}
