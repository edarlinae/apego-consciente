import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .then(() => {
          this.router.navigate(['/perfil']);
        })
        .catch(error => {
          // --- LÓGICA DE ERROR MEJORADA ---
          // Comprobamos el código de error que nos devuelve Firebase
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
              this.errorMessage = 'El correo electrónico o la contraseña son incorrectos.';
              break;
            default:
              this.errorMessage = 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
              break;
          }
          console.error('Error de login:', error);
        });
    }
  }
}
