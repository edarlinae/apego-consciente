import { Injectable } from '@angular/core';

export type AttachmentStyle = 'Seguro' | 'Ansioso' | 'Evitativo' | 'Desorganizado';

// La interfaz ampliada con toda la información detallada
export interface TestResult {
  style: AttachmentStyle;
  summary: string;
  details: {
    title: string;
    coreFear: string;
    characteristics: string[];
    growthPath: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AttachmentStyleService {

  constructor() { }

  calculateResult(formValue: { [key: string]: string }): TestResult {
    const scores = Object.values(formValue).map(val => parseInt(val, 10));
    const scoreSeguro = scores[0] + scores[4] + scores[7] + scores[10];
    const scoreAnsioso = scores[1] + scores[3] + scores[6] + scores[9];
    const scoreEvitativo = scores[2] + scores[5] + scores[8];

    if (scoreAnsioso > 12 && scoreEvitativo > 9) {
      return this.getDesorganizadoResult();
    }
    if (scoreSeguro > 15 && scoreAnsioso < 10 && scoreEvitativo < 8) {
      return this.getSeguroResult();
    }

    const allScores = [
      { style: 'Ansioso' as AttachmentStyle, score: scoreAnsioso },
      { style: 'Evitativo' as AttachmentStyle, score: scoreEvitativo },
      { style: 'Seguro' as AttachmentStyle, score: scoreSeguro }
    ];
    allScores.sort((a, b) => b.score - a.score);
    const highestScoreStyle = allScores[0].style;

    switch (highestScoreStyle) {
      case 'Ansioso': return this.getAnsiosoResult();
      case 'Evitativo': return this.getEvitativoResult();
      case 'Seguro':
      default: return this.getSeguroResult();
    }
  }

  private getSeguroResult(): TestResult {
    return {
      style: 'Seguro',
      summary: 'Te sientes cómodo/a con la intimidad y la autonomía, navegando las relaciones con confianza y resiliencia.',
      details: {
        title: 'El Ancla Confiable',
        coreFear: 'Aunque no es paralizante, tu miedo sería la pérdida de una conexión valiosa por falta de cuidado mutuo.',
        characteristics: [
          'Comunicas tus necesidades de forma abierta y honesta.',
          'Confías en tu pareja y ofreces un espacio seguro para la vulnerabilidad.',
          'Manejas los conflictos de forma constructiva, buscando la reparación.',
          'Mantienes un fuerte sentido de ti mismo/a dentro y fuera de la relación.'
        ],
        growthPath: 'Tu camino es mantener y profundizar esta seguridad, practicando la gratitud, creando rituales de conexión y apoyando el crecimiento individual de tu pareja.'
      }
    };
  }

  private getAnsiosoResult(): TestResult {
    return {
      style: 'Ansioso',
      summary: 'Anhelas la intimidad, pero a menudo te preocupa que tu pareja no te corresponda, lo que te genera inseguridad.',
      details: {
        title: 'El Corazón Esperanzado',
        coreFear: 'El abandono y el rechazo. Temes que si no estás alerta, la conexión se romperá.',
        characteristics: [
          'Eres muy sensible a los cambios de humor y a la distancia de tu pareja.',
          'Buscas constantemente señales de seguridad y validación.',
          'Tiendes a poner las necesidades de tu pareja por encima de las tuyas.',
          'Puedes sentir que "das más" en la relación y te preocupas por no ser suficiente.'
        ],
        growthPath: 'Tu camino es aprender a auto-regular tus emociones y construir una base de autoestima sólida. Se trata de encontrar la seguridad primero en ti mismo/a para poder vivir la relación desde la calma y no desde el miedo.'
      }
    };
  }

  private getEvitativoResult(): TestResult {
    return {
      style: 'Evitativo',
      summary: 'Valoras tu independencia y autosuficiencia, y puedes sentirte incómodo/a con demasiada cercanía emocional.',
      details: {
        title: 'El Explorador Independiente',
        coreFear: 'La pérdida de tu autonomía y ser controlado/a o "absorbido/a" por la relación.',
        characteristics: [
          'Prefieres no depender de los demás y que no dependan de ti.',
          'Tiendes a racionalizar las emociones en lugar de sentirlas.',
          'Necesitas mucho espacio personal y puedes sentirte "asfixiado/a" por la intimidad.',
          'En momentos de estrés, tu impulso es alejarte y resolver las cosas por tu cuenta.'
        ],
        growthPath: 'Tu camino es aprender a ver la interdependencia no como una amenaza, sino como una fortaleza. Se trata de permitirte ser vulnerable en pequeñas dosis y descubrir que la conexión puede ampliar tu mundo, no reducirlo.'
      }
    };
  }

  private getDesorganizadoResult(): TestResult {
    return {
      style: 'Desorganizado',
      summary: 'Tus respuestas sugieren una combinación de un fuerte anhelo de cercanía y, a la vez, un gran miedo a ella.',
      details: {
        title: 'La Danza del "Ven y Vete"',
        coreFear: 'El miedo a la propia relación. La fuente de seguridad (tu pareja) se percibe también como una fuente potencial de dolor.',
        characteristics: [
          'Experimentas un conflicto interno: deseas la intimidad, pero te aterra.',
          'Tus relaciones pueden ser volátiles, pasando de la idealización a la devaluación.',
          'Te cuesta confiar y puedes esperar lo peor de las personas que más quieres.',
          'En momentos de conflicto, puedes sentirte paralizado/a, sin saber si acercarte o huir.'
        ],
        growthPath: 'Tu camino es el de la integración y la seguridad. Se trata de aprender a calmar tu sistema nervioso y a construir previsibilidad y coherencia en tu vida y tus relaciones, demostrándote a ti mismo/a que un vínculo seguro es posible.'
      }
    };
  }
}
