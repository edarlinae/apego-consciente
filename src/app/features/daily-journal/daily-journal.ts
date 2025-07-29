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

  journalForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    emotions: [[] as string[], [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

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
      this.journalForm.reset({ emotions: [] });
      this.isFormVisible = false;
    }
  }

  // --- NUEVO MÉTODO PARA BORRAR UNA ENTRADA ---
  deleteEntry(entryId: string | undefined): void {
    // Pedimos confirmación al usuario para evitar borrados accidentales
    if (entryId && confirm('¿Estás seguro de que quieres borrar esta entrada? No se podrá recuperar.')) {
      this.userService.deleteJournalEntry(entryId);
    }
  }
}
