import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// --- Tus credenciales de Firebase (verificadas desde la captura) ---
const firebaseConfig = {
  apiKey: "AIzaSyBO3KAW-44uDa_jZSoVdrhBiuDYCUEsVQk",
  authDomain: "apego-consciente-app.firebaseapp.com",
  projectId: "apego-consciente-app",
  storageBucket: "apego-consciente-app.firebasestorage.app",
  messagingSenderId: "948689160351",
  appId: "1:948689160351:web:d93db124cf5adf4b393aaa",
  measurementId: "G-CHMN1JMBKK"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Proveedores de Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
