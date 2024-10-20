import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { authActions } from './auth.actions';
import { Store } from '@ngrx/store';
import { userActions } from '../user/user.actions';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore = inject(Firestore);
  store = inject(Store);
  dialog = inject(MatDialog);

  constructor() {
    const uid = localStorage.getItem('uid') || '';
    if (!uid) this.store.dispatch(authActions.loginFail());
    else {
      this.login(uid);
      this.dialog.closeAll();
    }
  }

  async login(uid: any) {
    const collectionRef = collection(this.firestore, 'auth');
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      this.store.dispatch(authActions.loginFail());
    } else {
      this.store.dispatch(
        authActions.loginSuccess({ auth: querySnapshot.docs[0].data() })
      );
    }
  }

  async addNewAuth(username: string) {
    const authRef = collection(this.firestore, 'auth');

    const auth = {
      username,
      uid: this.generateId(),
    };
    try {
      this.store.dispatch(authActions.loginSuccess({ auth }));
      const docRef = await addDoc(authRef, auth);
      localStorage.setItem('uid', auth.uid);
      this.store.dispatch(userActions.create({ uid: auth.uid }));
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async checkExists(uid: string) {
    const collectionRef = collection(this.firestore, 'auth');
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;
    localStorage.setItem('uid', uid);
    this.login(uid);
    return true;
  }

  generateId() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now().toString().slice(-5);
    return uniqid;
  }
}
