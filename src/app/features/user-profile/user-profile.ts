import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.html', // SIN .component
  styleUrl: './user-profile.scss'    // SIN .component
})
export class UserProfileComponent {
  // Usamos 'inject' como una forma moderna de inyectar servicios.
  public userService = inject(UserService);
}