import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  // Ruta principal de la aplicación
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'test-apego',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/attachment-test/attachment-test').then(
        (c) => c.AttachmentTestComponent
      ),
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user-profile/user-profile').then(
        (c) => c.UserProfileComponent
      ),
  },
  {
    path: 'diario',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/daily-journal/daily-journal').then(
        (c) => c.DailyJournalComponent
      ),
  },
  {
    path: 'recursos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/resources/resources').then(
        (c) => c.ResourcesComponent
      ),
  },
  {
    path: 'ejercicios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/exercises/exercises').then(
        (c) => c.ExercisesComponent
      ),
  },
  {
    path: 'planificador',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/planner/planner').then(
        (c) => c.PlannerComponent
      ),
  },
  // --- NUEVA RUTA ---
  {
    path: 'termometro',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/relationship-tracker/relationship-tracker').then(
        (c) => c.RelationshipTrackerComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];