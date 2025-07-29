import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-daily-journal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './daily-journal.html',
  styleUrl: './daily-journal.scss'
})
export class DailyJournalComponent {
  public userService = inject(UserService);
  private fb = inject(FormBuilder);

  isFormVisible = false;
  
  emotions = ['Alegría', 'Tristeza', 'Enojo', 'Miedo', 'Sorpresa', 'Ansiedad', 'Gratitud', 'Culpa', 'Vergüenza', 'Frustración'];

  // --- CAMBIO CLAVE ---
  // El control 'emotions' ahora es un FormControl que manejará un array.
  // Le añadimos un validador para asegurar que el array no esté vacío.
  journalForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    emotions: [[] as string[], [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  /**
   * Maneja la selección de una emoción.
   * Añade o quita la emoción del array en el formulario.
   * @param emotion La emoción sobre la que se ha hecho clic.
   */
  toggleEmotion(emotion: string): void {
    const emotionsControl = this.journalForm.get('emotions') as FormControl;
    const currentEmotions: string[] = emotionsControl.value || [];
    
    if (this.isSelected(emotion)) {
      // Si ya está seleccionada, la quitamos
      emotionsControl.setValue(currentEmotions.filter(e => e !== emotion));
    } else {
      // Si no está seleccionada, la añadimos
      emotionsControl.setValue([...currentEmotions, emotion]);
    }
  }

  /**
   * Comprueba si una emoción está actualmente seleccionada en el formulario.
   * @param emotion La emoción a comprobar.
   * @returns 'true' si está seleccionada, 'false' si no.
   */
  isSelected(emotion: string): boolean {
    const currentEmotions: string[] = this.journalForm.get('emotions')?.value || [];
    return currentEmotions.includes(emotion);
  }

  onSubmit(): void {
    if (this.journalForm.valid) {
      this.userService.addJournalEntry(this.journalForm.value);
      this.journalForm.reset({ emotions: [] }); // Reseteamos el formulario, asegurando que 'emotions' sea un array vacío
      this.isFormVisible = false;
    }
  }
}
