import { Injectable } from '@angular/core';

export interface Conduct {
  id: string;
  text: string;
}

export interface Tip {
  conductId: string;
  text: string;
}

const resourcesData: Record<string, { conducts: Conduct[], tips: Tip[] }> = {
  'Ansioso': {
    conducts: [
        { id: 'anx1', text: 'Siento una necesidad urgente de contactar a mi pareja si no responde.' },
        { id: 'anx2', text: 'Interpreto el silencio o la distancia como una señal de rechazo.' },
        { id: 'anx3', text: 'Busco constantemente validación y seguridad sobre sus sentimientos.' },
        { id: 'anx4', text: 'Me cuesta concentrarme en mis propias actividades si hay tensión en la relación.' },
        { id: 'anx5', text: 'Idealizo a mi pareja y la relación al principio.' },
        { id: 'anx6', text: 'Suelo sacrificar mis propias necesidades para mantener la paz.' },
        { id: 'anx7', text: 'Me preocupa mucho la idea de que mi pareja me abandone.' },
        { id: 'anx8', text: 'Analizo en exceso pequeños gestos o palabras de mi pareja.' },
        { id: 'anx9', text: 'Siento celos o inseguridad cuando mi pareja pasa tiempo con otras personas.' },
        { id: 'anx10', text: 'Me adapto rápidamente a los gustos y preferencias de mi pareja, a veces perdiendo los míos.' },
    ],
    tips: [
        { conductId: 'anx1', text: 'Practica la "pausa consciente". Antes de actuar por impulso, respira hondo 10 veces y pregúntate: ¿Qué necesito realmente en este momento? ¿Seguridad o control?' },
        { conductId: 'anx2', text: 'Desarrolla la "narrativa generosa". En lugar de asumir lo peor, crea una historia alternativa y positiva. Ejemplo: "Quizás está ocupado/a en una reunión importante".' },
        { conductId: 'anx3', text: 'Aprende a auto-validarte. Escribe tres cosas que te gustan de ti mismo/a. La seguridad externa es temporal, la interna es duradera.' },
        { conductId: 'anx4', text: 'Crea un "menú de autocuidado". Una lista de actividades que te reconecten contigo mismo/a (leer, pasear, escuchar música) y recurre a ella en momentos de ansiedad.' },
        { conductId: 'anx5', text: 'Practica la "observación realista". Escribe tanto las cualidades que admiras de tu pareja como sus imperfecciones. Esto ayuda a equilibrar la idealización.' },
        { conductId: 'anx6', text: 'Establece un "micro-límite". Empieza por algo pequeño, como decir "Necesito 10 minutos para mí antes de que hablemos de esto".' },
        { conductId: 'anx7', text: 'Fortalece tu red de apoyo. Llama a un amigo o familiar para hablar de algo no relacionado con tu pareja. Recuerda que tu bienestar no depende de una sola persona.' },
        { conductId: 'anx8', text: 'Designa un "tiempo de no análisis". Dedica 15 minutos al día a pensar en la relación si lo necesitas, pero fuera de ese tiempo, redirige tu atención conscientemente.' },
        { conductId: 'anx9', text: 'Explora la raíz de tus celos. ¿Vienen de una experiencia pasada? ¿De una inseguridad personal? Escribir sobre ello puede revelar el verdadero origen.' },
        { conductId: 'anx10', text: 'Realiza una "cita contigo mismo/a". Haz una actividad que a ti te encante, sin importar si a tu pareja le gusta o no. Reconecta con tu identidad.' },
    ]
  },
  'Evitativo': {
    conducts: [
        { id: 'evi1', text: 'Siento la necesidad de alejarme o tener mi propio espacio cuando las cosas se ponen muy emocionales.' },
        { id: 'evi2', text: 'Me siento incómodo/a con las muestras excesivas de afecto o dependencia.' },
        { id: 'evi3', text: 'Prefiero mantener mis problemas y preocupaciones para mí mismo/a.' },
        { id: 'evi4', text: 'Me enfoco en los defectos de mi pareja para crear distancia emocional.' },
        { id: 'evi5', text: 'Siento que mi independencia es lo más importante y temo perderla.' },
        { id: 'evi6', text: 'Envío señales mixtas, acercándome y luego alejándome sin una razón aparente.' },
        { id: 'evi7', text: 'Me cuesta identificar y expresar mis propias emociones.' },
        { id: 'evi8', text: 'Me siento abrumado/a si mi pareja necesita mucho apoyo emocional.' },
        { id: 'evi9', text: 'Fantaseo con una "pareja ideal" que no tendría las imperfecciones de la actual.' },
        { id: 'evi10', text: 'Utilizo el trabajo, hobbies o distracciones para evitar la intimidad.' },
    ],
    tips: [
        { conductId: 'evi1', text: 'Comunica tu necesidad de espacio de forma proactiva y con un tiempo definido. Ejemplo: "Me siento abrumado/a, necesito 30 minutos para calmarme y luego hablamos".' },
        { conductId: 'evi2', text: 'Empieza con "micro-dosis" de conexión. Propón una actividad compartida corta, como tomar un café juntos durante 15 minutos sin distracciones.' },
        { conductId: 'evi3', text: 'Practica compartir algo de bajo riesgo. Comenta un pequeño desafío que tuviste en el trabajo. Observa que compartir no te hace vulnerable, te hace humano/a.' },
        { conductId: 'evi4', text: 'Realiza un "ejercicio de gratitud". Cada día, piensa o escribe una cualidad positiva de tu pareja. Esto entrena a tu cerebro a enfocarse en lo bueno.' },
        { conductId: 'evi5', text: 'Redefine la independencia como "interdependencia". Ser un equipo no anula tu individualidad, la fortalece con apoyo.' },
        { conductId: 'evi6', text: 'Antes de alejarte, identifica la emoción que sientes. ¿Es miedo? ¿Agobio? Ponerle nombre al sentimiento reduce su poder.' },
        { conductId: 'evi7', text: 'Usa una "rueda de emociones" (puedes buscarla online). Te ayudará a poner nombre a lo que sientes más allá de "bien" o "mal".' },
        { conductId: 'evi8', text: 'Ofrece apoyo no verbal. A veces, un gesto como poner una mano en el hombro o simplemente escuchar en silencio es una forma poderosa de conectar sin sentirte presionado/a a "solucionar" nada.' },
        { conductId: 'evi9', text: 'Acepta la "suficiente bondad". Ninguna relación es perfecta. La fantasía es una forma de escape; enfócate en construir algo real y valioso.' },
        { conductId: 'evi10', text: 'Agenda "tiempo de conexión" en tu calendario, como si fuera una reunión importante. Trátalo con la misma seriedad.' },
    ]
  },
  'Seguro': {
    conducts: [
        { id: 'seg1', text: 'Me siento cómodo/a expresando mis necesidades y escuchando las de mi pareja.' },
        { id: 'seg2', text: 'Confío en mi pareja y no suelo sentir celos o preocupación excesiva.' },
        { id: 'seg3', text: 'Disfruto tanto de la intimidad como de mi tiempo a solas.' },
        { id: 'seg4', text: 'Puedo manejar los conflictos de la relación de manera constructiva.' },
        { id: 'seg5', text: 'Busco y ofrezco apoyo emocional de forma equilibrada.' },
        { id: 'seg6', text: 'No temo el compromiso y veo la relación como un equipo.' },
        { id: 'seg7', text: 'Acepto a mi pareja como es, con sus virtudes y defectos.' },
        { id: 'seg8', text: 'Mi autoestima no depende exclusivamente de mi relación.' },
        { id: 'seg9', text: 'Puedo perdonar y superar las heridas después de un conflicto.' },
        { id: 'seg10', text: 'Comunico mis límites de forma clara y respetuosa.' },
    ],
    tips: [
        { conductId: 'seg1', text: 'Sigue practicando la comunicación "Yo siento...". Es la herramienta más poderosa para mantener la conexión.' },
        { conductId: 'seg2', text: 'Para mantener la confianza, agenda "chequeos de relación" mensuales para hablar sobre cómo os sentís, sin que haya un problema de por medio.' },
        { conductId: 'seg3', text: 'Anima a tu pareja a cultivar sus propios hobbies e intereses. Un apego seguro se nutre de dos individuos completos que eligen compartir su camino.' },
        { conductId: 'seg4', text: 'Introduce el concepto de "pausa respetuosa" en los conflictos. Si una discusión se acalora, acordad tomaros un tiempo para calmaros antes de continuar.' },
        { conductId: 'seg5', text: 'Practica la "escucha activa". Cuando tu pareja hable, intenta comprender su emoción subyacente, no solo sus palabras.' },
        { conductId: 'seg6', text: 'Cread "rituales de conexión" diarios. Pueden ser tan simples como tomar un café por la mañana o preguntarse "¿qué tal tu día?" sin distracciones.' },
        { conductId: 'seg7', text: 'Recuerda que el objetivo no es la ausencia de conflicto, sino la rapidez y eficacia de la "reparación" emocional tras el conflicto.' },
        { conductId: 'seg8', text: 'Continúa invirtiendo en tu crecimiento personal. Un libro, un curso, un hobby... todo lo que te nutre a ti, nutre a la relación.' },
        { conductId: 'seg9', text: 'El perdón es una elección activa. Si surge un resentimiento, pregúntate: "¿Qué necesito para dejar esto ir?".' },
        { conductId: 'seg10', text: 'Revisa tus límites periódicamente. A medida que creces y cambias, tus necesidades también lo hacen. Comunicarlas es un acto de amor propio y hacia la relación.' },
    ]
  },
  'Desorganizado': {
    conducts: [
      { id: 'des1', text: 'Anhelo la intimidad profundamente, pero cuando alguien se acerca, siento pánico y ganas de huir.' },
      { id: 'des2', text: 'Mis relaciones suelen ser intensas, caóticas y con muchos altibajos.' },
      { id: 'des3', text: 'Me cuesta confiar en los demás, esperando que me hagan daño o me abandonen.' },
      { id: 'des4', text: 'A veces saboteo la relación inconscientemente cuando las cosas empiezan a ir bien.' },
      { id: 'des5', text: 'Tengo dificultades para regular mis emociones; puedo pasar de la calma a la ira o la tristeza muy rápido.' },
      { id: 'des6', text: 'Me veo a mí mismo/a y a los demás de formas contradictorias (a veces buenos, a veces malos).' },
      { id: 'des7', text: 'Me siento paralizado/a o "congelado/a" durante los conflictos.' },
      { id: 'des8', text: 'Busco la cercanía de una forma que puede parecer controladora o desesperada.' },
      { id: 'des9', text: 'Siento una sensación subyacente de que soy defectuoso/a o indigno/a de amor.' },
      { id: 'des10', text: 'Me cuesta creer que una relación pueda ser un lugar seguro y estable.' },
    ],
    tips: [
      { conductId: 'des1', text: 'Practica el "anclaje sensorial". Cuando sientas pánico, nombra 5 cosas que puedas ver, 4 que puedas tocar, 3 que puedas oír, 2 que puedas oler y 1 que puedas saborear. Esto te devuelve al presente.' },
      { conductId: 'des2', text: 'Crea "islas de calma". Establece rutinas predecibles y no negociables en tu día que te den estabilidad, independientemente del estado de tu relación (ej. un paseo matutino).' },
      { conductId: 'des3', text: 'Construye la confianza en "micro-pasos". Pide a tu pareja algo muy pequeño y de bajo riesgo. Cuando lo cumpla, anótalo. Acumular pruebas de fiabilidad ayuda a reescribir la desconfianza.' },
      { conductId: 'des4', text: 'Identifica tus "patrones de sabotaje". ¿Dejas de contestar? ¿Inicias una pelea? Reconocer el patrón es el primer paso para poder elegir una respuesta diferente.' },
      { conductId: 'des5', text: 'Aprende a "surfear la ola emocional". En lugar de luchar contra una emoción intensa, imagínala como una ola. Obsérvala, siente su pico y cómo gradualmente pierde fuerza. No durará para siempre.' },
      { conductId: 'des6', text: 'Practica la "integración". Escribe una cualidad que te gusta de tu pareja y una que te frustra en la misma frase. Ejemplo: "Amo su espontaneidad aunque a veces me frustra su desorganización".' },
      { conductId: 'des7', text: 'Desarrolla un "plan de pausa". Acuerda con tu pareja una palabra clave que signifique "necesito parar ahora mismo". Tener un plan de escape seguro reduce el miedo al conflicto.' },
      { conductId: 'des8', text: 'Enfócate en la "auto-regulación" antes que en la "co-regulación". Antes de buscar a tu pareja para calmarte, prueba una técnica de respiración (inhalar 4s, sostener 4s, exhalar 6s).' },
      { conductId: 'des9', text: 'Inicia un "diario de auto-compasión". Cada día, escribe algo que hiciste bien, por pequeño que sea. Trátate a ti mismo/a con la amabilidad que le ofrecerías a un buen amigo.' },
      { conductId: 'des10', text: 'Busca la "seguridad suficiente". Ninguna relación es 100% segura todo el tiempo. El objetivo es construir una base que sea lo suficientemente segura como para tolerar los momentos de incertidumbre.' },
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  
  getConductsForStyle(style: string): Conduct[] {
    return resourcesData[style]?.conducts || [];
  }

  getTipsForStyle(style: string): Tip[] {
    return resourcesData[style]?.tips || [];
  }
}
