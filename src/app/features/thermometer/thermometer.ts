import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-thermometer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './thermometer.html',
  styleUrls: ['./thermometer.scss']
})
export class ThermometerComponent {
  public userService = inject(UserService);
  private fb = inject(FormBuilder);

  public isFormVisible = false;
  public checkupForm: FormGroup;

  public ratingOptions = [1, 2, 3, 4, 5];

  constructor() {
    this.checkupForm = this.fb.group({
      connection: [0, [Validators.min(1)]],
      communication: [0, [Validators.min(1)]],
      intimacy: [0, [Validators.min(1)]],
      conflicts: [0, [Validators.min(1)]],
      appreciation: ['', [Validators.required, Validators.minLength(10)]],
      request: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // --- NUEVO: Getter para un acceso más limpio a los controles desde el HTML ---
  get f() {
    return this.checkupForm.controls;
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
    if (this.isFormVisible) {
      this.checkupForm.reset({
        connection: 0, communication: 0, intimacy: 0, conflicts: 0,
        appreciation: '', request: ''
      });
    }
  }

  setRating(field: string, value: number) {
    this.checkupForm.get(field)?.setValue(value);
  }

  onSubmit() {
    this.checkupForm.markAllAsTouched();
    if (this.checkupForm.valid) {
      this.userService.addThermometerCheckup(this.checkupForm.value);
      this.isFormVisible = false;
    }
  }
}
