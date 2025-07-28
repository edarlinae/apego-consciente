import { Injectable, inject, signal } from '@angular/core';
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
  // Inyectamos los servicios de Firebase Auth y el Router de Angular
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  // Signal para almacenar el estado del usuario actual.
  // Empieza como 'undefined' para representar un estado de "cargando" o "desconocido".
  // Luego será 'User | null' (el objeto de usuario de Firebase o nulo si no hay sesión).
  public currentUser = signal<User | null | undefined>(undefined);

  constructor() {
    // onAuthStateChanged es un observador de Firebase que nos notifica
    // cada vez que el estado de autenticación cambia (login, logout).
    onAuthStateChanged(this.auth, (user) => {
      // Actualizamos nuestro signal con el usuario actual.
      this.currentUser.set(user);
    });
  }

  /**
   * Registra un nuevo usuario con email y contraseña.
   * @param credentials - Objeto con email y password.
   * @returns Una promesa que se resuelve con las credenciales del usuario creado.
   */
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Inicia sesión con email y contraseña.
   * @param credentials - Objeto con email y password.
   * @returns Una promesa que se resuelve con las credenciales del usuario.
   */
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Cierra la sesión del usuario actual.
   * Navega a la página de inicio de sesión después de cerrar sesión.
   */
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
