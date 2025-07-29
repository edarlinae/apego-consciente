import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
// Importamos el nuevo servicio y la interfaz
import { ExercisesService, Exercise } from '../../core/services/exercises.service';
import { RouterLink } from '@angular/router';

// Definimos el tipo aquí para usarlo en el componente
type AttachmentStyle = 'Seguro' | 'Ansioso' | 'Evitativo' | 'Desorganizado';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exercises.html',
  styleUrls: ['./exercises.scss']
})
export class ExercisesComponent {
  public userService = inject(UserService);
  // Inyectamos el nuevo servicio
  private exercisesService = inject(ExercisesService);

  // Tipos de apego disponibles para la selección
  attachmentStyles: AttachmentStyle[] = ['Seguro', 'Ansioso', 'Evitativo', 'Desorganizado'];

  // Signal para almacenar el estilo de apego seleccionado para la pareja
  partnerStyle = signal<AttachmentStyle | null>(null);

  // Signal computado para obtener el estilo de apego del propio usuario
  userStyle = computed(() => this.userService.profile()?.testResult?.style as AttachmentStyle | null);

  // Signal computado que obtiene los ejercicios una vez que ambos estilos están definidos
  coupleExercises = computed<Exercise[]>(() => {
    const uStyle = this.userStyle();
    const pStyle = this.partnerStyle();

    if (uStyle && pStyle) {
      // Usamos el nuevo servicio para obtener los ejercicios
      return this.exercisesService.getExercisesForStyles(uStyle, pStyle);
    }
    return [];
  });

  /**
   * Se ejecuta cuando el usuario selecciona el estilo de apego de su pareja.
   * @param style El estilo seleccionado.
   */
  selectPartnerStyle(style: AttachmentStyle) {
    this.partnerStyle.set(style);
  }
}
