import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentStyleService, TestResult } from '../../core/services/attachment-style';

interface Question {
  id: string;
  text: string;
}

@Component({
  selector: 'app-attachment-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './attachment-test.html',
  styleUrl: './attachment-test.scss',
})
export class AttachmentTestComponent implements OnInit {
  testForm!: FormGroup;
  
  // Array de preguntas actualizado a 11
  questions: Question[] = [
    { id: 'q1', text: 'Me resulta relativamente fácil acercarme a los demás y sentirme cómodo/a dependiendo de ellos.' },
    { id: 'q2', text: 'Me preocupa que mi pareja no me quiera de verdad o no desee permanecer a mi lado.' },
    { id: 'q3', text: 'Me siento incómodo/a cuando alguien quiere demasiada intimidad emocional conmigo.' },
    { id: 'q4', text: 'Quiero tener relaciones muy íntimas, pero a menudo siento que los demás no están tan dispuestos como yo.' },
    { id: 'q5', text: 'Confío en que mi pareja estará ahí para mí cuando lo necesite.' },
    { id: 'q6', text: 'Valoro mucho mi independencia y prefiero resolver mis problemas por mi cuenta.' },
    { id: 'q7', text: 'A veces, mis ganas de intimar y mi necesidad de reafirmación pueden asustar a la gente.' },
    { id: 'q8', text: 'Me siento seguro/a y conectado/a en mis relaciones cercanas sin un miedo abrumador a perderlas.' },
    { id: 'q9', text: 'Cuando alguien se acerca demasiado, siento un impulso de alejarme o poner distancia.' },
    { id: 'q10', text: 'Si no recibo noticias de mi pareja, tiendo a pensar que algo malo ha sucedido o que está enfadada conmigo.' },
    { id: 'q11', text: 'Resolver los desacuerdos con mi pareja no suele ser un gran problema para mí.' }
  ];

  result: TestResult | null = null;

  constructor(
    private fb: FormBuilder,
    private attachmentStyleService: AttachmentStyleService
  ) {}

  ngOnInit(): void {
    const formControls: { [key: string]: any } = {};
    this.questions.forEach(question => {
      formControls[question.id] = ['', Validators.required];
    });
    this.testForm = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      this.result = this.attachmentStyleService.calculateResult(this.testForm.value);
    } else {
      console.log('El formulario no es válido');
    }
  }
}