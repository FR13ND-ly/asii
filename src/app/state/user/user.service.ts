import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  getDoc,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { userActions } from './user.actions';
import { debounceTime, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  store = inject(Store);
  lastUpdated = new Date();

  constructor() {
    this.store
      .select('user')
      .pipe(filter((data) => data!.uid))
      .subscribe((data) => {
        if (new Date().getTime() - this.lastUpdated.getTime() > 5000) {
          this.lastUpdated = new Date();
          this.update(data);
        }
      });
  }

  async addNewUser(a: any) {
    const userRef = collection(this.firestore, 'user');
    const user = {
      uid: a.uid,
      points: 0,
      ppcUpgrades: {
        mouse: 0,
        keyboard: 0,
        headset: 0,
        monitor: 0,
      },
      ppsUpgrades: {
        cpu: 0,
        ram: 0,
        ssd: 0,
        gpu: 0,
        os: 0,
        ai: 0,
      },
    };
    try {
      const docRef = await addDoc(userRef, user);
      this.store.dispatch(userActions.update({ data: user }));
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async get(data: any) {
    const collectionRef = collection(this.firestore, 'user');
    const q = query(collectionRef, where('uid', '==', data.auth.uid));
    const querySnapshot = await getDocs(q);
    this.store.dispatch(
      userActions.update({ data: querySnapshot.docs[0].data() as any })
    );
  }

  async update(data: any) {
    const userRef = collection(this.firestore, 'user');
    const q = query(userRef, where('uid', '==', data.uid));
    const querySnapshot = await getDocs(q);
    await updateDoc(querySnapshot.docs[0].ref, data);
  }

  async getTopUsers() {
    let userCollection = collection(this.firestore, 'user');
    const userQuery = query(userCollection, orderBy('points', 'desc'));
    const usersSnapshot = await getDocs(userQuery);

    if (usersSnapshot.empty) {
      console.log('No users found.');
      return;
    }

    const userUids: any[] = [];
    let res: any = [];
    let authCollection = collection(this.firestore, 'auth');
    usersSnapshot.forEach(async (doc: any) => {
      let q = query(authCollection, where('uid', '==', doc.data().uid));
      let a = await getDocs(q);
      res.push({
        username: a.docs[0].data()?.['username'],
        points: doc.data().points,
      });
    });

    return res;
  }
}
