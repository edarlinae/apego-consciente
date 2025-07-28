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
  // Inyectamos los servicios necesarios
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variable para mostrar mensajes de error
  errorMessage: string | null = null;

  // Definición del formulario de login
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .then(() => {
          // Si el login es exitoso, navegamos al perfil
          this.router.navigate(['/perfil']);
        })
        .catch(error => {
          // Si hay un error, mostramos un mensaje al usuario
          this.errorMessage = 'El correo electrónico o la contraseña son incorrectos.';
          console.error('Error de login:', error);
        });
    }
  }
}
