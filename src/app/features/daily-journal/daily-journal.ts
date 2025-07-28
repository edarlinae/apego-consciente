import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-daily-journal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  // Rutas corregidas sin el sufijo .component
  templateUrl: './daily-journal.html',
  styleUrl: './daily-journal.scss'
})
export class DailyJournalComponent {
  public userService = inject(UserService);
  private fb = inject(FormBuilder);

  isFormVisible = false;
  
  emotions = ['Alegría', 'Tristeza', 'Enojo', 'Miedo', 'Sorpresa', 'Ansiedad', 'Gratitud'];

  journalForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    emotion: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit(): void {
    if (this.journalForm.valid) {
      this.userService.addJournalEntry(this.journalForm.value);
      this.journalForm.reset();
      this.isFormVisible = false;
    }
  }
}
