import { Injectable } from '@angular/core';

export interface Exercise {
  title: string;
  description: string;
  steps: string[];
  icon: string;
}

const exercisesData: Record<string, Exercise[]> = {
  // --- Dinámica Desorganizado - Seguro ---
  'Desorganizado-Seguro': [
    {
      icon: '⚓',
      title: 'El Ancla Segura',
      description: 'El seguro actúa como una base estable y predecible, ayudando al desorganizado a regularse en momentos de caos emocional.',
      steps: [
        'Cuando el desorganizado se sienta abrumado, el seguro debe mantener una postura calmada y un tono de voz suave.',
        'El seguro puede decir: "Estoy aquí contigo. No voy a ninguna parte. Respira conmigo".',
        'El objetivo no es solucionar el problema, sino que el seguro actúe como un ancla, demostrando con consistencia que la conexión es segura incluso durante una tormenta.'
      ]
    },
    {
      icon: '💔➡️❤️',
      title: 'Práctica de Reparación Consciente',
      description: 'Las rupturas son inevitables, pero para el desorganizado son aterradoras. Este ejercicio enseña que la conexión puede repararse, construyendo resiliencia.',
      steps: [
        'Después de un conflicto, una vez que ambos estéis calmados, sentaos juntos.',
        'El seguro empieza diciendo: "Mi parte en esto fue...". Luego, el desorganizado hace lo mismo.',
        'Terminad diciendo: "A pesar del conflicto, seguimos siendo un equipo".',
        'Repetir este ritual enseña al desorganizado que el conflicto no significa el fin de la relación.'
      ]
    }
  ],
  // --- Dinámica Desorganizado - Ansioso ---
  'Desorganizado-Ansioso': [
    {
      icon: '⏸️',
      title: 'La Pausa Estructurada',
      description: 'Evita que la ansiedad de uno active el pánico del otro. Crea un espacio seguro para que ambos sistemas nerviosos se calmen.',
      steps: [
        'Acordad una palabra clave de "pausa" no negociable que cualquiera de los dos puede usar cuando se sienta abrumado.',
        'Al usar la palabra, ambos os vais a habitaciones separadas durante 20 minutos con un temporizador.',
        'Durante la pausa, el objetivo es auto-regularse (respirar, escuchar música), no pensar en el conflicto.',
        'Volved a juntaros después, no para resolver el problema, sino para reconectar diciendo "estamos bien". El problema se puede hablar más tarde.'
      ]
    }
  ],
  // --- Dinámica Desorganizado - Evitativo ---
  'Desorganizado-Evitativo': [
    {
      icon: '📝',
      title: 'Comunicación Asíncrona',
      description: 'Reduce la presión de la comunicación cara a cara, que puede ser aterradora para ambos, permitiendo procesar y responder con más calma.',
      steps: [
        'Para temas emocionalmente cargados, probad a escribiros cartas o emails largos.',
        'Acordad un tiempo de respuesta (ej. 24 horas) para que no haya ansiedad por la inmediatez.',
        'Esto le da al evitativo el espacio que necesita para procesar y al desorganizado un canal de comunicación que se siente menos volátil y amenazante.'
      ]
    }
  ],
  // ... (resto de las combinaciones que ya teníamos)
  'Ansioso-Ansioso': [
    {
      icon: '🫂',
      title: 'El Abrazo de Co-regulación',
      description: 'Cuando ambos sienten ansiedad, el contacto físico puede ayudar a calmar el sistema nervioso de ambos a la vez, creando un círculo de seguridad en lugar de un círculo de pánico.',
      steps: [
        'Cuando uno de los dos sienta que la ansiedad aumenta, decid: "Necesito un abrazo de co-regulación".',
        'Abrazaos durante al menos 30 segundos en silencio, concentrándoos en la respiración del otro.',
        'Esto rompe el ciclo de escalada y os recuerda que estáis en el mismo equipo.'
      ]
    },
  ],
  'Evitativo-Evitativo': [
    {
      icon: '🛋️',
      title: 'Actividad Paralela Compartida',
      description: 'Crea una sensación de cercanía sin la presión de la interacción directa. Ideal para parejas que valoran mucho su independencia.',
      steps: [
        'Elegid una actividad que ambos podáis hacer por separado, pero en la misma habitación (leer, escuchar música con auriculares, dibujar).',
        'El objetivo es acostumbrarse a la presencia del otro de una forma cómoda y sin exigencias.'
      ]
    },
  ],
  'Seguro-Seguro': [
    {
      icon: '🗺️',
      title: 'El Mapa del Amor Actualizado',
      description: 'Una relación segura no es estática; crece y evoluciona. Este ejercicio asegura que sigáis conociendo el mundo interior del otro a medida que cambiáis.',
      steps: [
        'Una vez al mes, reservad un tiempo para haceros preguntas sobre vuestros mundos internos.',
        'Preguntas de ejemplo: "¿Cuál es tu mayor desafío actualmente?", "¿Hay algún sueño nuevo que tengas?".',
        'La única regla es escuchar con curiosidad, sin juzgar ni intentar solucionar nada.'
      ]
    },
  ],
  'Ansioso-Evitativo': [
    {
      icon: '🗓️',
      title: 'El Check-in Semanal Programado',
      description: 'Reduce la ansiedad del ansioso y respeta la necesidad de espacio del evitativo al crear un momento predecible y seguro para hablar.',
      steps: [
        'Acordad un día y hora fijos cada semana (ej. domingo a las 19h) para una charla de 30 minutos.',
        'El evitativo se siente seguro sabiendo que no será "emboscado" emocionalmente. El ansioso se siente seguro sabiendo que habrá un momento para hablar.'
      ]
    },
  ],
  'Ansioso-Seguro': [
    {
      icon: '🤝',
      title: 'Validación vs. Solución',
      description: 'El seguro aprende a ofrecer validación emocional, y el ansioso aprende a recibirla sin necesitar una solución inmediata.',
      steps: [
        'Cuando el ansioso exprese una preocupación, el seguro debe empezar su respuesta con: "Entiendo que te sientas así..." o "Tiene sentido que eso te preocupe porque...".',
        'El objetivo del seguro no es arreglar el problema, sino hacer que su pareja se sienta escuchada y comprendida.'
      ]
    },
  ],
  'Evitativo-Seguro': [
    {
      icon: '✉️',
      title: 'El Mensaje de Aprecio Diario',
      description: 'Una forma de bajo riesgo para que el evitativo practique la expresión emocional y el seguro se sienta conectado.',
      steps: [
        'Cada día, el evitativo debe enviar un mensaje de texto corto y específico apreciando algo del seguro. Ej: "Gracias por el café de esta mañana, me encantó".',
        'Este pequeño hábito construye un puente de conexión sin sentirse abrumador para el evitativo.'
      ]
    },
  ],
};

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  
  getExercisesForStyles(style1: string, style2: string): Exercise[] {
    const key1 = `${style1}-${style2}`;
    const key2 = `${style2}-${style1}`;
    
    return exercisesData[key1] || exercisesData[key2] || [];
  }
}
