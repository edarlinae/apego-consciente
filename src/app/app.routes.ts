import { Routes } from '@angular/router';

export const routes: Routes = [
  // --- Ruta para la sección de Autenticación ---
  {
    path: 'auth',
    // Carga las rutas hijas del archivo auth.routes.ts
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'test-apego',
    loadComponent: () =>
      import('./features/attachment-test/attachment-test').then(
        (c) => c.AttachmentTestComponent
      ),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./features/user-profile/user-profile').then(
        (c) => c.UserProfileComponent
      ),
  },
  {
    path: 'diario',
    loadComponent: () =>
      import('./features/daily-journal/daily-journal').then(
        (c) => c.DailyJournalComponent
      ),
  },
  {
    // Ahora la página principal será la de login
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
