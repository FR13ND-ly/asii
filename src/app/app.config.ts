import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { effects } from './state/app.effects';
import { userFeature } from './state/user/user.reducer';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { authFeature } from './state/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(userFeature),
    provideState(authFeature),
    provideEffects(effects),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'asii-5bcf1',
        appId: '1:106454265837:web:6599eabaed572d8ca101e4',
        storageBucket: 'asii-5bcf1.appspot.com',
        apiKey: 'AIzaSyAT_thPm83-E9AaB-urpVeKP-ou1OMex8I',
        authDomain: 'asii-5bcf1.firebaseapp.com',
        messagingSenderId: '106454265837',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
