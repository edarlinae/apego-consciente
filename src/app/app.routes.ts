import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'test-apego',
    loadComponent: () =>
      import('./features/attachment-test/attachment-test').then(
        (c) => c.AttachmentTestComponent
      ),
  },
  // Añadiremos más rutas aquí
  {
    path: '',
    redirectTo: 'test-apego', // Redirige la ruta vacía al test
    pathMatch: 'full',
  },
];