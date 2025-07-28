    import { Injectable } from '@angular/core';

    export interface Exercise {
      title: string;
      description: string; // El "porqué" del ejercicio
      steps: string[]; // El "cómo" del ejercicio
      icon: string; // Un emoji para darle un toque visual
    }

    // La clave del Record será una combinación de estilos, ej: "Ansioso-Evitativo"
    const exercisesData: Record<string, Exercise[]> = {
      // --- Dinámica Ansioso - Evitativo ---
      'Ansioso-Evitativo': [
        {
          icon: '🗓️',
          title: 'El Check-in Semanal Programado',
          description: 'Reduce la ansiedad del ansioso y respeta la necesidad de espacio del evitativo al crear un momento predecible y seguro para hablar.',
          steps: [
            'Acordad un día y hora fijos cada semana (ej. domingo a las 19h) para una charla de 30 minutos.',
            'Durante la semana, si surgen temas no urgentes, anotadlos para discutirlos en el check-in.',
            'El objetivo no es resolver todo, sino conectar y saber en qué punto está cada uno.',
            'El evitativo se siente seguro sabiendo que no será "emboscado" emocionalmente. El ansioso se siente seguro sabiendo que habrá un momento para hablar.'
          ]
        },
        {
          icon: '🚦',
          title: 'El Semáforo Emocional',
          description: 'Una herramienta no verbal para comunicar el nivel de saturación emocional y prevenir escaladas.',
          steps: [
            'Usad tres tarjetas o post-its: Verde ("Estoy bien para hablar"), Amarillo ("Necesito un momento, me estoy saturando"), Rojo ("Necesito una pausa ahora mismo").',
            'Cuando sintáis que una conversación se vuelve intensa, mostrad vuestro color.',
            'Amarillo significa "vamos más despacio". Rojo significa "pausa de 20 minutos, sin excepción".',
            'Esto le da al evitativo una vía de escape segura y le enseña al ansioso que una pausa no es un abandono.'
          ]
        },
        // ... Añadiríamos hasta 20 ejercicios para esta dinámica
      ],
      // --- Dinámica Ansioso - Seguro ---
      'Ansioso-Seguro': [
        {
          icon: '🤝',
          title: 'Validación vs. Solución',
          description: 'El seguro aprende a ofrecer validación emocional, y el ansioso aprende a recibirla sin necesitar una solución inmediata.',
          steps: [
            'Cuando el ansioso exprese una preocupación, el seguro debe empezar su respuesta con: "Entiendo que te sientas así..." o "Tiene sentido que eso te preocupe porque...".',
            'El objetivo del seguro no es arreglar el problema, sino hacer que su pareja se sienta escuchada y comprendida.',
            'El ansioso practica recibir esta validación como un acto de amor, separándolo de la necesidad de que el problema desaparezca al instante.'
          ]
        },
        {
          icon: '🧘',
          title: 'El Kit de Auto-Calma',
          description: 'El ansioso crea un "kit de emergencia" para momentos de ansiedad, fomentando la auto-regulación con el apoyo del seguro.',
          steps: [
            'Juntos, cread una caja o lista con cosas que calmen al ansioso: una playlist, un té, una foto, un libro, el número de un amigo.',
            'Cuando el ansioso sienta la necesidad de buscar al seguro para calmarse, primero debe usar un elemento del kit durante 15 minutos.',
            'El seguro apoya este proceso, celebrando los momentos en que el ansioso logra auto-calmarse.'
          ]
        },
      ],
      // --- Dinámica Evitativo - Seguro ---
      'Evitativo-Seguro': [
        {
          icon: '✉️',
          title: 'El Mensaje de Aprecio Diario',
          description: 'Una forma de bajo riesgo para que el evitativo practique la expresión emocional y el seguro se sienta conectado.',
          steps: [
            'Cada día, el evitativo debe enviar un mensaje de texto corto y específico apreciando algo del seguro. Ej: "Gracias por el café de esta mañana, me encantó".',
            'No se requiere una respuesta larga, solo un "gracias" o un emoji.',
            'Este pequeño hábito construye un puente de conexión sin sentirse abrumador para el evitativo.'
          ]
        },
        {
          icon: '🚪',
          title: 'El Ritual de Descompresión',
          description: 'Crea una transición suave del "mundo exterior" al "espacio de pareja", respetando la necesidad del evitativo de recargar energías.',
          steps: [
            'Al llegar a casa, el evitativo tiene 20 minutos de "tiempo de descompresión" sin interrupciones.',
            'Puede leer, escuchar música o simplemente estar en silencio.',
            'El seguro respeta este espacio, sabiendo que después de esa pausa, su pareja estará mucho más presente y disponible para conectar.'
          ]
        },
      ],
      // ... Añadiríamos las demás combinaciones (Seguro-Seguro, etc.)
    };
    
    @Injectable({
      providedIn: 'root'
    })
    export class ExercisesService {
      
      getExercisesForStyles(style1: string, style2: string): Exercise[] {
        // Creamos claves en ambos órdenes para encontrarlas fácilmente
        const key1 = `${style1}-${style2}`;
        const key2 = `${style2}-${style1}`;
        
        return exercisesData[key1] || exercisesData[key2] || [];
      }
    }
    