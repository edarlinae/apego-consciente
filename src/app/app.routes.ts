import { Routes } from '@angular/router';
// Importamos nuestro "guardia" para proteger las rutas.
// La ruta del archivo es con guion, como en tu estructura de carpetas.
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    // Carga perezosa de las rutas de autenticación (login, register)
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'test-apego',
    canActivate: [authGuard], // Esta ruta requiere que el usuario esté autenticado
    loadComponent: () =>
      import('./features/attachment-test/attachment-test').then(
        (c) => c.AttachmentTestComponent
      ),
  },
  {
    path: 'perfil',
    canActivate: [authGuard], // Esta ruta requiere que el usuario esté autenticado
    loadComponent: () =>
      import('./features/user-profile/user-profile').then(
        (c) => c.UserProfileComponent
      ),
  },
  {
    path: 'diario',
    canActivate: [authGuard], // Esta ruta requiere que el usuario esté autenticado
    loadComponent: () =>
      import('./features/daily-journal/daily-journal').then(
        (c) => c.DailyJournalComponent
      ),
  },
  {
    path: 'recursos',
    canActivate: [authGuard], // Esta ruta requiere que el usuario esté autenticado
    loadComponent: () =>
      import('./features/resources/resources').then(
        (c) => c.ResourcesComponent
      ),
  },
  {
    path: 'ejercicios',
    canActivate: [authGuard], // Esta ruta requiere que el usuario esté autenticado
    loadComponent: () =>
      import('./features/exercises/exercises').then(
        (c) => c.ExercisesComponent
      ),
  },
  {
    // La ruta por defecto de la aplicación ahora es la página de login
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    // Ruta "catch-all" para redirigir cualquier URL no encontrada al login
    path: '**',
    redirectTo: 'auth/login'
  }
];
