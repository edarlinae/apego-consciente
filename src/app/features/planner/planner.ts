import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService, Note, NoteCategory } from '../../core/services/user';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './planner.html',
  styleUrls: ['./planner.scss']
})
export class PlannerComponent {
  public userService = inject(UserService);

  // --- NUEVO: Función de ordenación ---
  // Esta función se asegura de que las notas no completadas (isCompleted: false)
  // aparezcan antes que las completadas (isCompleted: true).
  private sortNotes = (a: Note, b: Note) => {
    if (a.isCompleted === b.isCompleted) {
      return 0; // Si ambas están en el mismo estado, mantiene su orden relativo.
    }
    return a.isCompleted ? 1 : -1; // Si 'a' está completada, la envía al final.
  };

  // --- MODIFICADO: Signals computados para filtrar Y ORDENAR las notas ---
  personalTasks = computed(() => 
    this.userService.notes()
      .filter(n => n.category === 'personal')
      .sort(this.sortNotes)
  );
  conversations = computed(() => 
    this.userService.notes()
      .filter(n => n.category === 'conversations')
      .sort(this.sortNotes)
  );
  coupleFun = computed(() => 
    this.userService.notes()
      .filter(n => n.category === 'coupleFun')
      .sort(this.sortNotes)
  );
  coupleWork = computed(() => 
    this.userService.notes()
      .filter(n => n.category === 'coupleWork')
      .sort(this.sortNotes)
  );

  // Formularios para añadir nuevas notas en cada categoría (sin cambios)
  newNoteForms = {
    personal: new FormControl('', [Validators.required]),
    conversations: new FormControl('', [Validators.required]),
    coupleFun: new FormControl('', [Validators.required]),
    coupleWork: new FormControl('', [Validators.required])
  };

  // Manejo del estado de edición (sin cambios)
  editingNoteId = signal<string | null>(null);
  editingText = new FormControl('', [Validators.required]);

  // --- MÉTODOS (sin cambios en su lógica interna) ---
  addNote(category: NoteCategory) {
    const formControl = this.newNoteForms[category];
    if (formControl.valid && formControl.value) {
      this.userService.addNote(formControl.value, category);
      formControl.reset();
    }
  }

  deleteNote(noteId: string | undefined) {
    // NOTA: Se ha eliminado el window.confirm para evitar problemas en ciertos entornos.
    // Considera implementar un modal de confirmación personalizado si es necesario.
    if (noteId) {
      this.userService.deleteNote(noteId);
    }
  }

  toggleCompletion(note: Note) {
    if (note.id) {
      this.userService.toggleNoteCompletion(note.id, !note.isCompleted);
    }
  }

  startEditing(note: Note) {
    this.editingNoteId.set(note.id || null);
    this.editingText.setValue(note.text);
  }

  cancelEditing() {
    this.editingNoteId.set(null);
  }

  saveNote(noteId: string | undefined) {
    if (noteId && this.editingText.valid && this.editingText.value) {
      this.userService.updateNote(noteId, this.editingText.value);
      this.cancelEditing();
    }
  }
}
