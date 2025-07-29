import { Injectable } from '@angular/core';

// Interfaz para la estructura de cada ejercicio
export interface Exercise {
  icon: string;
  title: string;
  description: string;
  steps: string[];
}

// Tipos para los estilos de apego, para mayor seguridad en el código
type AttachmentStyle = 'Ansioso' | 'Evitativo' | 'Seguro' | 'Desorganizado';

// Base de datos de ejercicios por combinación de estilos
const exercisesData: Record<string, Exercise[]> = {
  // --- Dinámica: TÚ (Ansioso) y tu PAREJA (Segura) ---
  'Ansioso-Seguro': [
    {
      icon: '💬',
      title: 'El Chequeo Emocional Diario',
      description: 'Un ritual diario para que el ansioso exprese su necesidad de conexión y el seguro ofrezca tranquilidad sin sentirse presionado.',
      steps: [
        'Acordad un momento del día sin distracciones (ej. 10 min después de cenar).',
        'El miembro ansioso comparte: "Hoy me he sentido (emoción) y lo que necesitaría de ti ahora es (necesidad específica, ej: un abrazo, escucharme 5 min)".',
        'El miembro seguro escucha activamente, valida la emoción ("Entiendo que te sientas así") y ofrece la tranquilidad pedida.',
        'El objetivo no es resolver problemas, sino conectar y validar.'
      ]
    },
    {
      icon: '🧠',
      title: 'Cuestionando la Narrativa del Miedo',
      description: 'Ejercicio para que el ansioso aprenda a desafiar sus pensamientos catastróficos con la ayuda lógica y calmada del seguro.',
      steps: [
        'Cuando el ansioso sienta un pico de ansiedad (ej. "no me ha escrito, algo va mal"), lo comparte con el seguro.',
        'El seguro, en lugar de decir "no te preocupes", pregunta con curiosidad: "¿Qué es lo peor que crees que podría pasar? ¿Y qué tres explicaciones alternativas y más probables existen?".',
        'Juntos, exploran las evidencias reales que contradicen el miedo.',
        'El seguro ayuda al ansioso a anclarse en la realidad de la relación, no en la ansiedad.'
      ]
    },
    {
      icon: '❤️',
      title: 'El Tarro de la Seguridad',
      description: 'Una forma visual y tangible de acumular pruebas de la seguridad del vínculo, para que el ansioso pueda recurrir a ellas en momentos de duda.',
      steps: [
        'Decorad un tarro o una caja juntos.',
        'Cada vez que el miembro seguro haga algo que aporte seguridad (un mensaje inesperado, un gesto de apoyo), el miembro ansioso lo escribe en un papelito y lo mete en el tarro.',
        'Cuando el ansioso sienta inseguridad, puede abrir el tarro y leer los recuerdos de seguridad.',
        'Esto entrena al cerebro ansioso a enfocarse en las pruebas de conexión, no en las de posible abandono.'
      ]
    },
    {
      icon: '🗺️',
      title: 'Mapa de la Independencia Compartida',
      description: 'Fomenta que el ansioso desarrolle su mundo interior, apoyado por la confianza del seguro.',
      steps: [
        'En una cartulina, cada uno escribe 3 hobbies o intereses que quiere desarrollar por su cuenta.',
        'El miembro seguro expresa verbalmente su apoyo incondicional: "Me encanta que hagas esto por ti, cuéntame cómo te va".',
        'Agendan "citas individuales" en el calendario y se comprometen a respetarlas.',
        'Al reencontrarse, comparten con entusiasmo sus experiencias, enriqueciendo la relación.'
      ]
    },
    {
      icon: '🤝',
      title: 'Negociando la Necesidad de Espacio',
      description: 'Un ejercicio para que el seguro pueda pedir espacio sin activar el miedo al abandono del ansioso.',
      steps: [
        'El seguro aprende a pedir espacio de forma proactiva y con un tiempo definido: "Necesito una hora para mí, pero a las 8 estoy totalmente para ti".',
        'El ansioso practica la auto-calma durante ese tiempo, usando una de sus estrategias (ver sección "Recursos").',
        'Es crucial que el seguro cumpla el tiempo prometido para construir confianza.',
        'Al volver, el seguro inicia la reconexión con un gesto de afecto, reforzando que el espacio no es rechazo.'
      ]
    },
    {
      icon: '🗣️',
      title: 'Traduciendo el Lenguaje del Apego',
      description: 'Aprender a comunicar las necesidades de forma que el otro pueda entenderlas y satisfacerlas.',
      steps: [
        'El ansioso traduce su protesta ("¡Nunca me escuchas!") a una necesidad vulnerable ("Me siento solo/a y necesito sentir que te importo").',
        'El seguro traduce su retirada ("Necesito estar solo") a una necesidad de regulación ("Me siento abrumado/a y necesito un momento para procesar antes de poder hablar").',
        'Practican usar estas nuevas frases en conversaciones de bajo riesgo.',
        'Esto crea un puente de empatía y reduce los malentendidos.'
      ]
    }
  ],
  // --- Dinámica: TÚ (Ansioso) y tu PAREJA (Evitativa) ---
  'Ansioso-Evitativo': [
    {
      icon: '🚦',
      title: 'El Semáforo de la Conexión',
      description: 'Una herramienta visual para que el ansioso pueda medir el nivel de disponibilidad del evitativo sin presionar, y el evitativo pueda comunicar su estado sin palabras.',
      steps: [
        'Cread tres tarjetas: una verde ("Estoy disponible y receptivo"), una amarilla ("Necesito un momento, me siento algo saturado") y una roja ("Ahora mismo no puedo, necesito espacio para mí").',
        'El miembro evitativo puede colocar la tarjeta correspondiente en un lugar visible (ej. en la nevera).',
        'El miembro ansioso se compromete a respetar la señal, usando ese tiempo para su propio autocuidado.',
        'Esto reduce la persecución del ansioso y la huida del evitativo, creando un espacio más seguro para ambos.'
      ]
    },
    {
      icon: '🏝️',
      title: 'La Isla Segura',
      description: 'Crear un tiempo y espacio sagrado para la conexión, libre de demandas y presiones, donde ambos puedan bajar sus defensas.',
      steps: [
        'Agendad 20 minutos, dos veces por semana, como "Tiempo en la Isla Segura".',
        'Durante este tiempo, está prohibido hablar de problemas de la relación, logística o temas estresantes.',
        'Solo pueden hacer algo agradable juntos: escuchar una canción, tomar un té, compartir algo bueno del día.',
        'El objetivo es que el evitativo asocie la cercanía con calma y disfrute, y el ansioso reciba una dosis predecible de conexión.'
      ]
    },
    {
      icon: '📦',
      title: 'La Caja de las Preocupaciones',
      description: 'Un lugar simbólico para que el ansioso "deposite" sus ansiedades en lugar de volcarlas sobre el evitativo, y que puedan ser revisadas en un momento pactado.',
      steps: [
        'Decorad una caja juntos.',
        'Cuando el ansioso tenga una preocupación sobre la relación, la escribe y la mete en la caja.',
        'Una vez a la semana, abren la caja juntos y hablan sobre uno o dos de los papeles de forma calmada.',
        'Esto enseña al ansioso a contener su ansiedad y al evitativo a no sentirse constantemente bombardeado.'
      ]
    },
    {
      icon: '🏆',
      title: 'Celebrando la Autonomía del Otro',
      description: 'Cambiar el enfoque de la interdependencia a la celebración de la individualidad de cada uno.',
      steps: [
        'El miembro ansioso hace un esfuerzo consciente por animar al evitativo a tener su propio espacio y hobbies.',
        'El miembro evitativo comparte algo positivo de su tiempo a solas, mostrando que no es un rechazo.',
        'Ambos se agradecen mutuamente el respeto por la independencia del otro.',
        'Esto ayuda al evitativo a sentirse menos "atrapado" y al ansioso a construir su propia autoestima.'
      ]
    },
    {
      icon: '📜',
      title: 'El Guion de la Desactivación',
      description: 'Tener frases preparadas para desactivar el ciclo de persecución-huida cuando empieza.',
      steps: [
        'El ansioso prepara la frase: "Veo que necesitas espacio. Voy a cuidar de mí. Aquí estoy cuando estés listo/a".',
        'El evitativo prepara la frase: "No es por ti. Me siento saturado/a. Necesito X minutos y vuelvo".',
        'Practican decirlas en voz alta cuando están calmados.',
        'Usarlas durante un conflicto rompe el patrón automático y da a ambos un respiro para regularse.'
      ]
    },
    {
      icon: '💖',
      title: 'Afecto No Exigente',
      description: 'Encontrar formas de conexión física que no se sientan abrumadoras para el evitativo.',
      steps: [
        'Explorad formas de contacto que no sean cara a cara, como sentarse espalda con espalda mientras leen, o tocarse los pies en el sofá.',
        'El ansioso propone: "¿Te apetece un abrazo de 10 segundos?", dando control y un límite claro al evitativo.',
        'Normalizad el afecto casual, como un toque en el brazo al pasar.',
        'Esto permite la conexión sin la intensidad que puede abrumar al evitativo.'
      ]
    }
    // ... Añadir más combinaciones aquí
  ],
  // --- Dinámica: TÚ (Seguro) y tu PAREJA (Evitativa) ---
  'Seguro-Evitativo': [
    {
      icon: '⚓',
      title: 'El Ancla de la Calma',
      description: 'Tú, como ancla segura, ayudas a tu pareja a regularse cuando se siente abrumada, sin presionar.',
      steps: [
        'Cuando notes que tu pareja se distancia, en lugar de preguntar "¿Qué te pasa?", prueba a decir con calma: "Parece que es un momento intenso. Tómate el espacio que necesites, yo estoy aquí".',
        'Ofrece apoyo no verbal: un vaso de agua, una manta, o simplemente tu presencia silenciosa en la misma habitación.',
        'No intentes "solucionar" su emoción. Tu calma es el mejor co-regulador.',
        'Esto le enseña al evitativo que la intimidad no tiene por qué ser invasiva y que puede contar con tu presencia estable.'
      ]
    },
    {
      icon: '🗓️',
      title: 'Rituales de Conexión Predecibles',
      description: 'La predictibilidad crea seguridad para el evitativo. Establecer rituales de conexión de baja presión.',
      steps: [
        'Acordad una actividad corta y regular que sea solo vuestra. Ej: tomar el café juntos 15 minutos por la mañana sin móviles.',
        'Mantened este ritual de forma consistente. La clave es la fiabilidad, no la intensidad.',
        'Durante el ritual, enfocaos en temas ligeros y positivos. No es el momento de discusiones profundas.',
        'Esto construye una base de confianza y demuestra que la conexión puede ser segura y no demandante.'
      ]
    },
    {
      icon: '🗣️',
      title: 'Comunicación Proactiva del Espacio',
      description: 'Como persona segura, puedes modelar cómo comunicar las necesidades de forma saludable, incluyendo la tuya.',
      steps: [
        'Sé el primero en decir: "Hoy he tenido un día duro, necesito 30 minutos para desconectar antes de que hablemos".',
        'Al hacer esto, normalizas la necesidad de espacio y demuestras que no significa rechazo.',
        'Anima a tu pareja a hacer lo mismo, sin juzgar la cantidad de tiempo que necesite.',
        'Esto le da al evitativo el "permiso" y el lenguaje para pedir lo que necesita sin sentirse culpable.'
      ]
    },
    {
      icon: '🔍',
      title: 'El Detective de Intereses',
      description: 'Muestra un interés genuino en el mundo interior y las pasiones de tu pareja evitativa.',
      steps: [
        'En lugar de preguntar por sus sentimientos, pregunta por sus hobbies, proyectos o cosas que ha aprendido.',
        'Haz preguntas abiertas y curiosas sobre esos temas: "¿Qué es lo que más te gusta de eso? ¿Cómo funciona?".',
        'Escucha activamente sin intentar convertirlo en una conversación emocional.',
        'Conectar a través de sus pasiones es una puerta trasera hacia la intimidad que se siente mucho más segura para ellos.'
      ]
    },
    {
      icon: '🤝',
      title: 'El Equipo de Resolución de Problemas',
      description: 'Abordar los problemas como un equipo contra el problema, no como tú contra tu pareja.',
      steps: [
        'Plantea los problemas de forma práctica y lógica. "Tenemos este desafío logístico. ¿Qué soluciones se te ocurren?".',
        'Usa un lenguaje de equipo: "Nosotros", "nuestro desafío", "juntos".',
        'Enfocaos en la acción y las soluciones, no solo en el análisis de las emociones.',
        'Esto apela a la fortaleza del evitativo en la resolución práctica y reduce la sensación de ataque emocional.'
      ]
    },
    {
      icon: '💌',
      title: 'Aprecio por Escrito',
      description: 'El afecto expresado de forma indirecta puede ser más fácil de recibir para una persona evitativa.',
      steps: [
        'Déjale una nota corta y específica agradeciendo algo que hizo: "Gracias por preparar el café esta mañana, me ha encantado".',
        'Envíale un mensaje de texto apreciando una cualidad suya: "Admiro mucho lo bien que se te da [su habilidad]".',
        'No esperes una gran reacción emocional. El mensaje será recibido y procesado internamente.',
        'Esta forma de comunicación asíncrona respeta su necesidad de procesar las emociones en privado.'
      ]
    }
  ]
  // Puedes añadir el resto de combinaciones como 'Ansioso-Ansioso', 'Evitativo-Evitativo', 'Seguro-Seguro', etc.
};


@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  /**
   * Obtiene la lista de ejercicios para una combinación específica de estilos de apego.
   * @param userStyle Estilo de apego del usuario.
   * @param partnerStyle Estilo de apego de la pareja.
   * @returns Un array de ejercicios.
   */
  getExercisesForStyles(userStyle: AttachmentStyle, partnerStyle: AttachmentStyle): Exercise[] {
    const key = `${userStyle}-${partnerStyle}`;
    const reverseKey = `${partnerStyle}-${userStyle}`;

    // Devuelve los ejercicios para la clave directa (ej. Ansioso-Seguro)
    // o para la clave inversa (ej. Seguro-Ansioso) si la primera no existe.
    return exercisesData[key] || exercisesData[reverseKey] || [];
  }
}
