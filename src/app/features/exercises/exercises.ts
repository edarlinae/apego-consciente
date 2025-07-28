    import { Component, computed, inject, signal } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { UserService } from '../../core/services/user';
    import { ExercisesService, Exercise } from '../../core/services/exercises';
    import { RouterLink } from '@angular/router';

    @Component({
      selector: 'app-exercises',
      standalone: true,
      imports: [CommonModule, RouterLink],
      templateUrl: './exercises.html',
      styleUrl: './exercises.scss'
    })
    export class ExercisesComponent {
      public userService = inject(UserService);
      private exercisesService = inject(ExercisesService);

      // Tipos de apego disponibles para la selección
      attachmentStyles = ['Seguro', 'Ansioso', 'Evitativo'];

      // Signal para almacenar el estilo de apego seleccionado para la pareja
      partnerStyle = signal<string | null>(null);

      // Signal computado para obtener el estilo de apego del propio usuario
      userStyle = computed(() => this.userService.profile()?.testResult?.style || null);

      // Signal computado que obtiene los ejercicios una vez que ambos estilos están definidos
      coupleExercises = computed<Exercise[]>(() => {
        const uStyle = this.userStyle();
        const pStyle = this.partnerStyle();

        if (uStyle && pStyle) {
          return this.exercisesService.getExercisesForStyles(uStyle, pStyle);
        }
        return [];
      });

      /**
       * Se ejecuta cuando el usuario selecciona el estilo de apego de su pareja.
       * @param style El estilo seleccionado.
       */
      selectPartnerStyle(style: string) {
        this.partnerStyle.set(style);
      }
    }
    