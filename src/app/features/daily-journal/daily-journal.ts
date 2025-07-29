import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-daily-journal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './daily-journal.html',
  styleUrls: ['./daily-journal.scss']
})
export class DailyJournalComponent {
  public userService = inject(UserService);
  private fb = inject(FormBuilder);

  isFormVisible = false;
  
  emotions = ['Alegría', 'Tristeza', 'Enojo', 'Miedo', 'Sorpresa', 'Ansiedad', 'Gratitud', 'Culpa', 'Vergüenza', 'Frustración'];

  // El formulario se inicializa llamando a un método para poder recrearlo fácilmente.
  journalForm: FormGroup = this.createJournalForm();

  /**
   * NUEVO: Método para crear una instancia limpia del formulario.
   * Esto asegura que el formulario esté siempre en su estado inicial.
   * @returns Un nuevo FormGroup.
   */
  createJournalForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      emotions: [[] as string[], [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  toggleEmotion(emotion: string): void {
    const emotionsControl = this.journalForm.get('emotions') as FormControl;
    const currentEmotions: string[] = emotionsControl.value || [];
    
    if (this.isSelected(emotion)) {
      emotionsControl.setValue(currentEmotions.filter(e => e !== emotion));
    } else {
      emotionsControl.setValue([...currentEmotions, emotion]);
    }
  }

  isSelected(emotion: string): boolean {
    const currentEmotions: string[] = this.journalForm.get('emotions')?.value || [];
    return currentEmotions.includes(emotion);
  }

  onSubmit(): void {
    if (this.journalForm.valid) {
      this.userService.addJournalEntry(this.journalForm.value);
      
      // --- CORRECCIÓN CLAVE ---
      // En lugar de resetear, recreamos el formulario para asegurar un estado limpio.
      this.journalForm = this.createJournalForm(); 
      
      this.isFormVisible = false;
    }
  }

  deleteEntry(entryId: string | undefined): void {
    // Se ha eliminado el window.confirm para una mejor experiencia.
    // Considera añadir un modal de confirmación si lo ves necesario.
    if (entryId) {
      this.userService.deleteJournalEntry(entryId);
    }
  }
}
