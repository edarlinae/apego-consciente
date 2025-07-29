import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// --- MODIFICADO: Importamos los nuevos tipos ---
import { UserService, WeeklyEntry, RatingCategory } from '../../core/services/user';

@Component({
  selector: 'app-relationship-tracker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './relationship-tracker.html',
  styleUrls: ['./relationship-tracker.scss']
})
export class RelationshipTrackerComponent {
  public userService = inject(UserService);
  private fb = inject(FormBuilder);

  isFormVisible = signal(false);
  editingEntryId = signal<string | null>(null);

  // --- MODIFICADO: Tipamos el array de preguntas ---
  questions: { id: RatingCategory; text: string }[] = [
    { id: 'intimacy', text: '¿Cómo ha sido la intimidad y conexión afectiva esta semana?' },
    { id: 'conflicts', text: '¿Cómo hemos gestionado los desacuerdos o conflictos?' },
    { id: 'communication', text: '¿Qué tal ha sido la comunicación y la escucha mutua?' },
    { id: 'support', text: '¿Nos hemos sentido como un equipo que se apoya mutuamente?' },
    { id: 'fun', text: '¿Hemos compartido momentos de alegría, diversión o risas?' }
  ];

  trackerForm: FormGroup = this.fb.group({
    intimacy: [0, [Validators.required, Validators.min(1)]],
    conflicts: [0, [Validators.required, Validators.min(1)]],
    communication: [0, [Validators.required, Validators.min(1)]],
    support: [0, [Validators.required, Validators.min(1)]],
    fun: [0, [Validators.required, Validators.min(1)]],
    positiveAspects: ['', Validators.required],
    negativeAspects: ['', Validators.required]
  });

  sortedEntries = computed(() => {
    return this.userService.weeklyEntries().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  // --- MODIFICADO: Tipamos el questionId ---
  setRating(questionId: RatingCategory, rating: number) {
    this.trackerForm.get(questionId)?.setValue(rating);
  }

  startEdit(entry: WeeklyEntry) {
    this.editingEntryId.set(entry.id!);
    this.isFormVisible.set(true);
    this.trackerForm.patchValue({
      intimacy: entry.ratings.intimacy,
      conflicts: entry.ratings.conflicts,
      communication: entry.ratings.communication,
      support: entry.ratings.support,
      fun: entry.ratings.fun,
      positiveAspects: entry.positiveAspects,
      negativeAspects: entry.negativeAspects
    });
  }

  cancelEdit() {
    this.editingEntryId.set(null);
    this.isFormVisible.set(false);
    this.trackerForm.reset({ intimacy: 0, conflicts: 0, communication: 0, support: 0, fun: 0, positiveAspects: '', negativeAspects: '' });
  }
  
  deleteEntry(entryId: string | undefined): void {
    if (entryId && confirm('¿Estás seguro de que quieres borrar este registro semanal?')) {
      this.userService.deleteWeeklyEntry(entryId);
    }
  }

  onSubmit() {
    // Marcamos todos los campos como "tocados" para que muestren errores si es necesario
    this.trackerForm.markAllAsTouched();
    if (this.trackerForm.invalid) return;

    const formValue = this.trackerForm.value;
    const entryData = {
      ratings: {
        intimacy: formValue.intimacy,
        conflicts: formValue.conflicts,
        communication: formValue.communication,
        support: formValue.support,
        fun: formValue.fun
      },
      positiveAspects: formValue.positiveAspects,
      negativeAspects: formValue.negativeAspects
    };
    
    const currentId = this.editingEntryId();
    if (currentId) {
      this.userService.updateWeeklyEntry(currentId, entryData);
    } else {
      this.userService.addWeeklyEntry(entryData);
    }

    this.cancelEdit();
  }
}