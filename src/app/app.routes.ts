    import { Routes } from '@angular/router';
    import { authGuard } from './core/guards/auth-guard';
    import { HomeComponent } from './features/home/home'; // Importamos el nuevo componente

    export const routes: Routes = [
      // --- NUEVA RUTA PRINCIPAL ---
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
      // ... (el resto de tus rutas protegidas: perfil, diario, recursos, ejercicios)
      {
        path: 'ejercicios',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/exercises/exercises').then(
            (c) => c.ExercisesComponent
          ),
      },
      {
        // --- REDIRECCIÓN POR DEFECTO ---
        // Ahora la ruta vacía redirige a la nueva página de inicio
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        // El comodín ahora también redirige a la página de inicio
        path: '**',
        redirectTo: 'home'
      }
    ];
    