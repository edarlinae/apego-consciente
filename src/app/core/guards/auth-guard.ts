import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * Un "Guard" funcional que protege las rutas.
 * Se ejecuta antes de que se active una ruta para decidir si se permite el acceso.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos los servicios que necesitamos.
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtenemos el estado actual del usuario desde nuestro AuthService.
  // El valor puede ser: User (objeto de usuario), null (no logueado), o undefined (cargando).
  const user = authService.currentUser();

  // Si el estado aún está cargando, por seguridad denegamos el acceso.
  if (user === undefined) {
    return false;
  }

  // Si hay un usuario (el valor no es nulo), se permite el acceso a la ruta.
  if (user) {
    return true;
  }

  // Si no hay usuario (el valor es nulo), redirigimos al usuario a la página
  // de login y denegamos el acceso a la ruta solicitada.
  router.navigate(['/auth/login']);
  return false;
};
