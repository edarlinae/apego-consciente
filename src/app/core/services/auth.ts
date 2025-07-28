import { Injectable, inject, signal, computed } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  // Signal que contiene el objeto de usuario de Firebase (o null).
  public currentUser = signal<User | null>(null);
  
  // Signal computado que nos da directamente el ID del usuario (o null).
  // Este será la clave para todas nuestras operaciones de base de datos.
  public uid = computed(() => this.currentUser()?.uid || null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth).then(() => {
      // Al cerrar sesión, redirigimos al login.
      this.router.navigate(['/auth/login']);
    });
  }
}
