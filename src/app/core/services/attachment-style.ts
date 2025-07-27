import { Injectable } from '@angular/core';

export type AttachmentStyle = 'Seguro' | 'Ansioso' | 'Evitativo' | 'Desorganizado' | 'Indeterminado';

export interface TestResult {
  style: AttachmentStyle;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttachmentStyleService {

  constructor() { }

  calculateResult(formValue: { [key: string]: string }): TestResult {
    const scores = Object.values(formValue).map(val => parseInt(val, 10));

    // Mapeo de preguntas a estilos (los números son el índice del array -1)
    // Seguro: q1, q5, q8, q11 (índices 0, 4, 7, 10)
    // Ansioso: q2, q4, q7, q10 (índices 1, 3, 6, 9)
    // Evitativo: q3, q6, q9 (índices 2, 5, 8)

    const scoreSeguro = scores[0] + scores[4] + scores[7] + scores[10];
    const scoreAnsioso = scores[1] + scores[3] + scores[6] + scores[9];
    const scoreEvitativo = scores[2] + scores[5] + scores[8];

    // Lógica de decisión ajustada para los nuevos umbrales
    // Puntuación máxima por estilo: Seguro (20), Ansioso (20), Evitativo (15)

    // Perfil predominantemente Seguro
    if (scoreSeguro > 15 && scoreAnsioso < 10 && scoreEvitativo < 8) {
      return {
        style: 'Seguro',
        description: 'Te sientes cómodo/a con la intimidad y la autonomía. Generalmente confías en tu pareja, te muestras resiliente y navegas las relaciones con confianza.'
      };
    }

    // Perfil predominantemente Ansioso
    if (scoreAnsioso > 14 && scoreSeguro < 12) {
      return {
        style: 'Ansioso',
        description: 'Anhelas la intimidad y cercanía, pero a menudo te preocupa que tu pareja no te corresponda. Eres muy sensible a las fluctuaciones y necesitas reafirmación en la relación.'
      };
    }

    // Perfil predominantemente Evitativo
    if (scoreEvitativo > 10 && scoreSeguro < 12) {
      return {
        style: 'Evitativo',
        description: 'Valoras mucho tu independencia y autosuficiencia. Puedes sentirte incómodo/a con demasiada cercanía y prefieres mantener una distancia emocional para protegerte.'
      };
    }

    // Perfil Desorganizado (puntuaciones altas en Ansioso y Evitativo)
    if (scoreAnsioso > 12 && scoreEvitativo > 8) {
         return {
            style: 'Desorganizado',
            description: 'Tus respuestas sugieren una combinación de un fuerte anhelo de cercanía y, a la vez, un gran miedo a ella. Puede que tus relaciones se sientan confusas, intensas e impredecibles.'
        };
    }

    // Si no encaja en un perfil claro, se puede considerar mixto o indeterminado
    return {
      style: 'Indeterminado',
      description: 'Tus respuestas muestran una mezcla de diferentes rasgos de apego. Sería beneficioso explorar estos patrones con más detalle para comprender mejor tus dinámicas en las relaciones.'
    };
  }
}