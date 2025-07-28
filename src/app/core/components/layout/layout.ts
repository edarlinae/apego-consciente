import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  // Añadimos CommonModule para poder usar directivas como *ngIf y *ngFor en la vista.
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {
  // Inyectamos el AuthService para acceder al estado del usuario (si está logueado o no)
  // y a sus métodos, como logout(). Al hacerlo público, la plantilla HTML puede acceder a él.
  public authService = inject(AuthService);
}
