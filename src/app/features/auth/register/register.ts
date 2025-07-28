    import { Component, inject } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
    import { Router, RouterLink } from '@angular/router';
    import { AuthService } from '../../../core/services/auth';

    @Component({
      selector: 'app-register',
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, RouterLink],
      templateUrl: './register.html',
      styleUrl: './register.scss'
    })
    export class RegisterComponent {
      private fb = inject(FormBuilder);
      private authService = inject(AuthService);
      private router = inject(Router);

      errorMessage: string | null = null;

      registerForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      onSubmit(): void {
        if (this.registerForm.valid) {
          this.authService.register(this.registerForm.value)
            .then(() => {
              this.router.navigate(['/perfil']);
            })
            .catch(error => {
              // --- ESTA ES LA PARTE IMPORTANTE ---
              // Imprime el error completo y detallado en la consola del navegador (F12)
              console.error('FIREBASE AUTH ERROR:', error); 
              
              // Ahora mostramos un mensaje de error más específico al usuario
              switch (error.code) {
                case 'auth/email-already-in-use':
                  this.errorMessage = 'Este correo electrónico ya está registrado.';
                  break;
                case 'auth/weak-password':
                  this.errorMessage = 'La contraseña es demasiado débil (mínimo 6 caracteres).';
                  break;
                case 'auth/invalid-email':
                  this.errorMessage = 'El formato del correo electrónico no es válido.';
                  break;
                case 'auth/operation-not-allowed':
                  this.errorMessage = 'El registro por email y contraseña no está habilitado en Firebase.';
                  break;
                default:
                  // Mostramos el código de error real para saber qué pasa
                  this.errorMessage = `Ha ocurrido un error inesperado: ${error.code}`;
                  break;
              }
            });
        }
      }
    }
    