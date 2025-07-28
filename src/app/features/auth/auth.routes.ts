import { Routes } from '@angular/router';
// Aseguramos que los componentes se importan correctamente.
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Redirige cualquier ruta vacía dentro de /auth a /auth/login
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
