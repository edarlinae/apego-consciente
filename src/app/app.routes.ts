import { Routes } from '@angular/router';
// Asegúrate de que la ruta al guard es correcta (con guion)
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'test-apego',
    canActivate: [authGuard], // Ruta protegida
    loadComponent: () =>
      import('./features/attachment-test/attachment-test').then(
        (c) => c.AttachmentTestComponent
      ),
  },
  {
    path: 'perfil',
    canActivate: [authGuard], // Ruta protegida
    loadComponent: () =>
      import('./features/user-profile/user-profile').then(
        (c) => c.UserProfileComponent
      ),
  },
  {
    path: 'diario',
    canActivate: [authGuard], // Ruta protegida
    loadComponent: () =>
      import('./features/daily-journal/daily-journal').then(
        (c) => c.DailyJournalComponent
      ),
  },
  {
    // --- RUTA DE RECURSOS (AÑADIDA Y CORREGIDA) ---
    path: 'recursos',
    canActivate: [authGuard], // Protegida, solo para usuarios logueados
    loadComponent: () =>
      import('./features/resources/resources').then(
        (c) => c.ResourcesComponent
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
