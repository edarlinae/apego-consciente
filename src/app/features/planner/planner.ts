    import { Component, computed, inject, signal } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
    import { UserService, Note, NoteCategory } from '../../core/services/user';

    @Component({
      selector: 'app-planner',
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule],
      templateUrl: './planner.html',
      styleUrl: './planner.scss'
    })
    export class PlannerComponent {
      public userService = inject(UserService);

      // Signals computados para filtrar las notas por categoría
      personalTasks = computed(() => this.userService.notes().filter(n => n.category === 'personal'));
      conversations = computed(() => this.userService.notes().filter(n => n.category === 'conversations'));
      coupleFun = computed(() => this.userService.notes().filter(n => n.category === 'coupleFun'));
      coupleWork = computed(() => this.userService.notes().filter(n => n.category === 'coupleWork'));

      // Formularios para añadir nuevas notas en cada categoría
      newNoteForms = {
        personal: new FormControl('', [Validators.required]),
        conversations: new FormControl('', [Validators.required]),
        coupleFun: new FormControl('', [Validators.required]),
        coupleWork: new FormControl('', [Validators.required])
      };

      // Manejo del estado de edición
      editingNoteId = signal<string | null>(null);
      editingText = new FormControl('', [Validators.required]);

      addNote(category: NoteCategory) {
        const formControl = this.newNoteForms[category];
        if (formControl.valid && formControl.value) {
          this.userService.addNote(formControl.value, category);
          formControl.reset();
        }
      }

      deleteNote(noteId: string | undefined) {
        if (noteId && confirm('¿Estás seguro de que quieres borrar esta nota?')) {
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
    