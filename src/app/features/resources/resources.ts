import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';

// --- INTERFACES Y TIPOS DE DATOS ---

export interface Conduct {
  id: string;
  text: string;
}

export interface Tip {
  conductId: string;
  texts: string[];
}

// Un tipo para la estructura de datos combinada que usaremos en la plantilla
export interface ConductWithTip {
  conduct: Conduct;
  tip: Tip | undefined;
}


// --- DATOS COMPLETOS DE RECURSOS ---

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
      { 
        conductId: 'anx1', 
        texts: [
          'Practica la "pausa consciente": Antes de actuar, respira hondo 10 veces y pregúntate qué necesitas realmente. ¿Es seguridad o es control?',
          'Activa tu "sistema de calma": Ten a mano una playlist relajante o el teléfono de un amigo para hablar de otro tema. El objetivo es auto-regularte, no que tu pareja lo haga por ti.',
          'Reta el pensamiento catastrófico: Escribe tres posibles razones inocentes por las que tu pareja no ha respondido (ej. "está conduciendo", "se quedó sin batería").'
        ] 
      },
      { 
        conductId: 'anx2', 
        texts: [
          'Desarrolla la "narrativa generosa": Asume una intención positiva por parte de tu pareja hasta que se demuestre lo contrario. Quizás necesita espacio para procesar, y no es un rechazo hacia ti.',
          'Comunica tu necesidad de forma vulnerable: En lugar de acusar, di "Cuando hay silencio, mi mente tiende a asustarse. Me ayudaría mucho saber que todo está bien entre nosotros".',
          'Diferencia entre "espacio" y "abandono": El espacio es una necesidad sana en cualquier relación. El abandono es tu miedo hablando. Trabaja en verlos como dos cosas distintas.'
        ]
      },
      {
        conductId: 'anx3',
        texts: [
          'Aprende a auto-validarte: Al final del día, escribe tres cosas que hiciste bien o de las que te sientas orgulloso/a, sin importar la opinión de los demás.',
          'Pide seguridad de forma específica y limitada: En lugar de un "¿me quieres?", prueba con un "Hoy me siento un poco inseguro/a, ¿podemos tener un momento de conexión sin móviles esta noche?".',
          'Observa y agradece las muestras de seguridad que ya existen: A menudo, la seguridad se muestra en pequeñas acciones diarias. Haz una lista de ellas.'
        ]
      },
      {
        conductId: 'anx4',
        texts: [
          'Crea un "menú de autocuidado": Una lista de actividades que te reconecten contigo mismo/a (leer, pasear, escuchar música) y recurre a ella en momentos de ansiedad.',
          'Practica el "compartimentalizar": Designa un tiempo específico para pensar en la relación. Fuera de ese tiempo, si tu mente vuelve al tema, dite a ti mismo/a "Ahora no, lo pensaré a las 8pm".',
          'Invierte en tus propias pasiones: Cuanto más rica sea tu vida fuera de la relación, menos poder tendrá la tensión de pareja para desestabilizarte por completo.'
        ]
      },
      {
        conductId: 'anx5',
        texts: [
          'Practica la "observación realista": Escribe tanto las cualidades que admiras de tu pareja como sus imperfecciones o cosas que te molestan. Nadie es perfecto.',
          'Introduce un ritmo más lento al principio: Sé consciente de la velocidad a la que compartes información personal o haces planes a futuro. Dale tiempo a la relación para que se desarrolle orgánicamente.',
          'Pregúntate: "¿Qué sé realmente de esta persona versus lo que he imaginado sobre ella?". Basa tus sentimientos en hechos, no en fantasías.'
        ]
      },
      {
        conductId: 'anx6',
        texts: [
          'Establece un "micro-límite": Empieza por algo pequeño, como decir "No me apetece ver esa película esta noche, ¿podemos elegir otra cosa?".',
          'Conecta con tus propias necesidades antes de responder: Antes de decir "sí" a algo, haz una pausa y pregúntate: "¿Qué es lo que yo realmente quiero o necesito en esta situación?".',
          'Recuerda que decir "no" a una petición no es decir "no" a la persona. Los límites sanos son esenciales para una relación equilibrada.'
        ]
      },
      {
        conductId: 'anx7',
        texts: [
          'Fortalece tu red de apoyo: Llama a un amigo o familiar para hablar de algo no relacionado con tu pareja. Recuerda que tu bienestar no depende de una sola persona.',
          'Crea un "ancla de seguridad interna": Identifica un lugar, un recuerdo o una sensación en tu cuerpo que te haga sentir en calma y practica volver a ella mentalmente cuando sientas miedo.',
          'Escribe sobre tus fortalezas y resiliencia: Haz una lista de todas las veces que has superado dificultades por tu cuenta. Eres más fuerte de lo que tu miedo te hace creer.'
        ]
      },
      {
        conductId: 'anx8',
        texts: [
          'Designa un "tiempo de no análisis": Dedica 15 minutos al día a pensar en la relación si lo necesitas, pero fuera de ese tiempo, redirige tu atención conscientemente.',
          'Practica la comunicación directa: En lugar de analizar un gesto, pregunta de forma abierta y curiosa. "He notado que hoy estás más callado/a, ¿está todo bien?".',
          'Enfócate en el patrón general, no en el detalle aislado: Una sola palabra o gesto no define la relación. Observa las tendencias generales de comportamiento de tu pareja a lo largo del tiempo.'
        ]
      },
      {
        conductId: 'anx9',
        texts: [
          'Explora la raíz de tus celos: ¿Vienen de una experiencia pasada? ¿De una inseguridad personal? Escribir sobre ello puede revelar el verdadero origen.',
          'Diferencia entre la "amenaza real" y la "amenaza percibida": Pregúntate, "¿Hay pruebas concretas de que algo malo está pasando, o es mi miedo el que está hablando?".',
          'Invierte en tu propia vida social: Tener tus propios amigos y actividades reduce la sensación de que tu pareja es tu única fuente de conexión y diversión.'
        ]
      },
      {
        conductId: 'anx10',
        texts: [
          'Realiza una "cita contigo mismo/a": Haz una actividad que a ti te encante, sin importar si a tu pareja le gusta o no. Reconecta con tu identidad.',
          'Practica expresar una preferencia diferente: Empieza con algo pequeño, como la comida o una película. "A mí en realidad me apetece más la comida italiana esta noche".',
          'Haz una lista de tus valores y pasiones no negociables: Ten claro qué es lo que te define y asegúrate de que esas cosas sigan teniendo espacio en tu vida.'
        ]
      }
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
        { conductId: 'evi1', texts: ['Comunica tu necesidad de espacio de forma proactiva y con un tiempo definido. Ejemplo: "Me siento abrumado/a, necesito 30 minutos para calmarme y luego hablamos".', 'Crea una "señal de tregua" no verbal con tu pareja que ambos entendáis como una necesidad de pausa, no como un rechazo.', 'Después de tomarte tu espacio, practica el "retorno consciente". Vuelve a la conversación, aunque sea solo para decir "Gracias por el espacio, podemos hablarlo mañana".'] },
        { conductId: 'evi2', texts: ['Empieza con "micro-dosis" de conexión. Propón una actividad compartida corta, como tomar un café juntos durante 15 minutos sin distracciones.', 'Practica el afecto no físico. Un elogio sincero o una palabra de agradecimiento pueden ser tan poderosos como un abrazo y sentirse más seguros para ti.', 'Explora el contacto físico de bajo compromiso, como sentaros juntos en el sofá viendo una película sin necesidad de abrazaros constantemente.'] },
        { conductId: 'evi3', texts: ['Practica compartir algo de bajo riesgo. Comenta un pequeño desafío que tuviste en el trabajo. Observa que compartir no te hace vulnerable, te hace humano/a.', 'Utiliza un diario para escribir tus preocupaciones. A menudo, el simple acto de escribirlas les quita poder y aclara tus pensamientos.', 'Elige a una persona de confianza (puede ser un amigo o familiar) para compartir algo un poco más personal. Practica recibir apoyo fuera de tu relación de pareja.'] },
        { conductId: 'evi4', texts: ['Realiza un "ejercicio de gratitud". Cada día, piensa o escribe una cualidad positiva de tu pareja. Esto entrena a tu cerebro a enfocarse en lo bueno.', 'Cuando identifiques un "defecto", pregúntate si es un verdadero problema o una estrategia de tu mente para crear distancia. Sé honesto/a contigo mismo/a.', 'Recuerda la "regla del 80/20": ninguna pareja te dará el 100% de lo que necesitas. Aceptar el 80% que sí funciona es clave para la satisfacción a largo plazo.'] },
        { conductId: 'evi5', texts: ['Redefine la independencia como "interdependencia". Ser un equipo no anula tu individualidad, la fortalece con apoyo.', 'Identifica qué aspectos específicos de tu autonomía temes perder. ¿Tu tiempo a solas? ¿Tus hobbies? Habla con tu pareja sobre cómo proteger esos espacios.', 'Observa las parejas seguras a tu alrededor. Verás que mantienen sus identidades individuales mientras forman un equipo sólido.'] },
        { conductId: 'evi6', texts: ['Antes de alejarte, intenta identificar la emoción que sientes. ¿Es miedo? ¿Agobio? Ponerle nombre al sentimiento reduce su poder y te da una pista de lo que realmente está pasando.', 'Sé consciente de tus "estrategias de distanciamiento" (ej. quedarte hasta tarde en el trabajo, iniciar una discusión sin importancia). El primer paso es reconocerlas.', 'Intenta comunicar tu ambivalencia de forma simple: "Me importas, pero ahora mismo necesito un poco de espacio". Es más claro que el silencio.'] },
        { conductId: 'evi7', texts: ['Usa una "rueda de emociones" (puedes buscarla online). Te ayudará a poner nombre a lo que sientes más allá de "bien" o "mal".', 'Conecta con tu cuerpo. ¿Dónde sientes la emoción? ¿En el pecho, en el estómago? Prestar atención a las sensaciones físicas es una puerta de entrada a los sentimientos.', 'Empieza a expresar emociones de bajo riesgo. Decir "Me siento cansado/a" o "Estoy contento/a por esto" es una buena práctica.'] },
        { conductId: 'evi8', texts: ['Ofrece apoyo no verbal. A veces, un gesto como poner una mano en el hombro o simplemente escuchar en silencio es una forma poderosa de conectar sin sentirte presionado/a a "solucionar" nada.', 'Aprende a decir: "Lamento que te sientas así. No sé cómo arreglarlo, pero estoy aquí para escucharte". Valida su emoción sin asumir la responsabilidad de resolverla.', 'Recuerda que tu rol no es ser el terapeuta de tu pareja. Tu rol es ser un compañero/a que apoya.'] },
        { conductId: 'evi9', texts: ['Acepta la "suficiente bondad". Ninguna relación es perfecta. La fantasía de la "pareja ideal" es a menudo una estrategia para evitar la intimidad real.', 'Cuando te encuentres fantaseando, redirige tu atención a algo positivo y real de tu pareja actual.', 'Habla con amigos en relaciones a largo plazo. Te darás cuenta de que todas las parejas tienen imperfecciones y desafíos.'] },
        { conductId: 'evi10', texts: ['Agenda "tiempo de conexión" en tu calendario, como si fuera una reunión importante. Trátalo con la misma seriedad.', 'Practica la "presencia plena" durante esos momentos. Guarda el teléfono y enfoca toda tu atención en tu pareja durante 10-15 minutos.', 'Intenta integrar a tu pareja en tus hobbies de vez en cuando. Puede que descubras una nueva forma de conectar que no se sienta como una "charla emocional".'] },
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
        { conductId: 'seg1', texts: ['Sigue practicando la comunicación "Yo siento...". Es la herramienta más poderosa para mantener la conexión.', 'Anima a tu pareja a expresar sus necesidades también, creando un espacio donde ambos os sintáis seguros para pedir lo que necesitáis.', 'Recuerda que expresar una necesidad no garantiza que se cumpla, pero sí abre la puerta a la negociación y el entendimiento mutuo.'] },
        { conductId: 'seg2', texts: ['Para mantener la confianza, agenda "chequeos de relación" mensuales para hablar sobre cómo os sentís, sin que haya un problema de por medio.', 'Habla abiertamente sobre tus amistades y actividades. La transparencia proactiva es el mejor antídoto contra la desconfianza.', 'Si sientes una punzada de celos, reconócela con curiosidad en lugar de con juicio. Pregúntate: "¿Qué me está diciendo esta emoción sobre mis miedos o necesidades actuales?".'] },
        { conductId: 'seg3', texts: ['Anima a tu pareja a cultivar sus propios hobbies e intereses. Un apego seguro se nutre de dos individuos completos que eligen compartir su camino.', 'Planificad intencionadamente tanto el "tiempo juntos" como el "tiempo separados". Ambos son igual de importantes para la salud de la relación.', 'Comparte con tu pareja lo que has disfrutado de tu tiempo a solas. Esto le incluye en tu mundo individual y refuerza que el espacio personal es algo positivo.'] },
        { conductId: 'seg4', texts: ['Introduce el concepto de "pausa respetuosa" en los conflictos. Si una discusión se acalora, acordad tomaros un tiempo para calmaros antes de continuar.', 'Recuerda que el objetivo no es "ganar" la discusión, sino entender la perspectiva del otro y encontrar una solución que funcione para ambos.', 'Después de un conflicto, enfocaos en la "reparación". Un simple "siento que las cosas se hayan puesto tensas, te quiero" puede ser increíblemente sanador.'] },
        { conductId: 'seg5', texts: ['Practica la "escucha activa". Cuando tu pareja hable, intenta comprender su emoción subyacente, no solo sus palabras.', 'Pregunta: "¿Necesitas que te escuche, que te abrace o que busquemos una solución juntos?". Ofrecer el tipo de apoyo que tu pareja necesita es un superpoder.', 'No olvides pedir apoyo para ti también. Ser el "pilar fuerte" todo el tiempo puede ser agotador. La vulnerabilidad es mutua.'] },
        { conductId: 'seg6', texts: ['Cread "rituales de conexión" diarios. Pueden ser tan simples como tomar un café por la mañana o preguntarse "¿qué tal tu día?" sin distracciones.', 'Hablad sobre vuestros sueños y metas a futuro, tanto individuales como de pareja. Esto crea un sentido de propósito compartido.', 'Celebrad los aniversarios y los pequeños logros. Reconocer el camino que habéis recorrido juntos fortalece el compromiso.'] },
        { conductId: 'seg7', texts: ['Practica la gratitud activa. Dile a tu pareja algo específico que aprecias de ella cada día.', 'Recuerda que aceptar no significa resignarse. Puedes aceptar a tu pareja por completo y aun así tener conversaciones sobre cosas que te gustaría que mejoraran.', 'Enfócate en las fortalezas de tu pareja, especialmente cuando sus defectos te frustren.'] },
        { conductId: 'seg8', texts: ['Continúa invirtiendo en tu crecimiento personal. Un libro, un curso, un hobby... todo lo que te nutre a ti, nutre a la relación.', 'Mantén tus amistades y redes de apoyo. Una relación sana es una parte importante de tu vida, no tu vida entera.', 'Celebra tus propios logros y permítete sentirte orgulloso/a de ti mismo/a, independientemente del estado de tu relación.'] },
        { conductId: 'seg9', texts: ['El perdón es una elección activa. Si surge un resentimiento, pregúntate: "¿Qué necesito para dejar esto ir?".', 'Diferencia entre perdonar y olvidar. Perdonar es liberarte a ti mismo/a de la carga del rencor; no significa que el comportamiento dañino fuera aceptable.', 'La reparación es un proceso de dos. Asegúrate de que ambos participáis en reconstruir la confianza después de una herida.'] },
        { conductId: 'seg10', texts: ['Revisa tus límites periódicamente. A medida que creces y cambias, tus necesidades también lo hacen. Comunicarlas es un acto de amor propio y hacia la relación.', 'Recuerda que los límites no son muros, son puertas. Definen cómo quieres que los demás interactúen contigo de forma respetuosa.', 'Apoya a tu pareja cuando establezca sus propios límites. Es una señal de una dinámica sana y equilibrada.'] },
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
      { conductId: 'des1', texts: ['Practica el "anclaje sensorial". Cuando sientas pánico, nombra 5 cosas que puedas ver, 4 que puedas tocar, 3 que puedas oír, 2 que puedas oler y 1 que puedas saborear. Esto te devuelve al presente.', 'Comunica tu ambivalencia. Decir "Una parte de mí quiere estar cerca, pero otra está asustada" es una forma honesta de explicar tu comportamiento a tu pareja.', 'Establece límites de tiempo para la intimidad. Acuerda pasar 30 minutos de conexión intensa y luego tener un tiempo a solas. Esto hace que la cercanía se sienta menos abrumadora.'] },
      { conductId: 'des2', texts: ['Crea "islas de calma". Establece rutinas predecibles y no negociables en tu día que te den estabilidad, independientemente del estado de tu relación (ej. un paseo matutino).', 'Identifica los "puntos de no retorno" en una discusión. Aprende a reconocer las señales físicas de que estás perdiendo el control para poder pedir una pausa antes de que la situación escale.', 'Lleva un diario de "momentos buenos". Anotar las interacciones positivas, por pequeñas que sean, ayuda a contrarrestar la tendencia a enfocarse solo en el caos.'] },
      { conductId: 'des3', texts: ['Construye la confianza en "micro-pasos". Pide a tu pareja algo muy pequeño y de bajo riesgo. Cuando lo cumpla, anótalo. Acumular pruebas de fiabilidad ayuda a reescribir la desconfianza.', 'Sé transparente sobre tu miedo a confiar. Decir "Me cuesta confiar por mis experiencias pasadas, pero estoy trabajando en ello" puede generar empatía en tu pareja.', 'Observa las acciones, no solo tus miedos. Basa tu nivel de confianza en el comportamiento consistente de tu pareja a lo largo del tiempo.'] },
      { conductId: 'des4', texts: ['Identifica tus "patrones de sabotaje". ¿Dejas de contestar? ¿Inicias una pelea? Reconocer el patrón es el primer paso para poder elegir una respuesta diferente.', 'Cuando sientas el impulso de sabotear, pregúntate: "¿Qué miedo estoy intentando evitar sintiendo?". A menudo, el sabotaje es una defensa contra el miedo a ser herido.', 'Celebra los momentos de estabilidad. Cuando las cosas vayan bien, permítete disfrutarlo conscientemente en lugar de esperar a que todo se derrumbe.'] },
      { conductId: 'des5', texts: ['Aprende a "surfear la ola emocional". En lugar de luchar contra una emoción intensa, imagínala como una ola. Obsérvala, siente su pico y cómo gradualmente pierde fuerza. No durará para siempre.', 'Crea un "plan de regulación". Cuando sientas que una emoción te desborda, ¿qué puedes hacer? (ej. salir a caminar, escuchar una canción específica, darte una ducha fría).', 'Etiqueta tus emociones sin juicio. Simplemente decir "estoy sintiendo mucha ira ahora mismo" puede crear una pequeña distancia y darte más control.'] },
      { conductId: 'des6', texts: ['Practica la "integración". Escribe una cualidad que te gusta de tu pareja y una que te frustra en la misma frase. Ejemplo: "Amo su espontaneidad aunque a veces me frustra su desorganización".', 'Recuerda que tanto tú como los demás sois seres humanos complejos, con luces y sombras. Nadie es 100% bueno o 100% malo.', 'Evita tomar decisiones importantes sobre la relación cuando estés en un estado emocional extremo (ya sea de idealización o devaluación). Espera a sentirte más centrado/a.'] },
      { conductId: 'des7', texts: ['Desarrolla un "plan de pausa". Acuerda con tu pareja una palabra clave que signifique "necesito parar ahora mismo". Tener un plan de escape seguro reduce el miedo al conflicto.', 'Durante una pausa, enfócate en calmar tu cuerpo. Moja tu cara con agua fría, estira los brazos, siente tus pies en el suelo. La regulación física es clave para salir de la parálisis.', 'Permítete no tener una respuesta inmediata. Está bien decir "No sé qué decir ahora mismo, necesito tiempo para procesarlo".'] },
      { conductId: 'des8', texts: ['Enfócate en la "auto-regulación" antes que en la "co-regulación". Antes de buscar a tu pareja para calmarte, prueba una técnica de respiración (inhalar 4s, sostener 4s, exhalar 6s).', 'Comunica tu necesidad de forma directa y simple: "Me siento desconectado/a y me gustaría un abrazo". Es más efectivo que las protestas o las indirectas.', 'Observa si tu búsqueda de cercanía es para conectar o para calmar un miedo. Si es lo segundo, prueba primero una de tus técnicas de auto-calma.'] },
      { conductId: 'des9', texts: ['Inicia un "diario de auto-compasión". Cada día, escribe algo que hiciste bien, por pequeño que sea. Trátate a ti mismo/a con la amabilidad que le ofrecerías a un buen amigo.', 'Separa tus acciones de tu identidad. Un error no te convierte en una "mala persona". Eres un ser humano que a veces comete errores.', 'Haz una lista de personas que te han mostrado amor y aprecio. Guárdala y léela cuando sientas que no eres digno/a de amor.'] },
      { conductId: 'des10', texts: ['Busca la "seguridad suficiente". Ninguna relación es 100% segura todo el tiempo. El objetivo es construir una base que sea lo suficientemente segura como para tolerar los momentos de incertidumbre.', 'Crea rituales de conexión predecibles con tu pareja. Saber que cada noche vais a cenar juntos sin móviles puede crear una sensación de estabilidad.', 'Enfócate en el "aquí y ahora". En este momento, ¿estás a salvo? ¿Tu pareja te está mostrando amor? A menudo, el miedo viene del pasado o del futuro, no del presente.'] },
    ]
  }
};


// --- SERVICIO DE RECURSOS ---

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


// --- COMPONENTE DE RECURSOS (LA CLASE CORREGIDA) ---

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resources.html',
  styleUrls: ['./resources.scss']
})
export class ResourcesComponent implements OnInit {
  private resourcesService = inject(ResourcesService);
  // NOTA: Deberías tener un servicio para obtener los datos del usuario.
  // private userService = inject(UserService); 

  // Almacena el estilo de apego del usuario.
  // **IMPORTANTE**: Por ahora, está fijado a 'Ansioso' para que puedas ver cómo funciona.
  // En tu aplicación real, deberías obtener este valor desde un servicio de usuario.
  userAttachmentStyle = signal<string | null>('Ansioso');

  // Almacena los IDs de las conductas que el usuario ha seleccionado.
  selectedConductIds = signal<Set<string>>(new Set());

  // Un "computed signal" que prepara los datos para mostrar en la plantilla.
  // Combina las conductas con sus respectivos tips.
  conductsWithTips = computed<ConductWithTip[]>(() => {
    const style = this.userAttachmentStyle();
    if (!style) {
      return [];
    }
    const conducts = this.resourcesService.getConductsForStyle(style);
    const tips = this.resourcesService.getTipsForStyle(style);

    const tipsMap = new Map(tips.map(tip => [tip.conductId, tip]));

    return conducts.map(conduct => ({
      conduct,
      tip: tipsMap.get(conduct.id)
    }));
  });

  ngOnInit(): void {
    // Aquí es donde deberías obtener el estilo de apego del usuario real.
    // Por ejemplo, si tuvieras un servicio de usuario (userService):
    // this.userService.currentUser.subscribe(user => {
    //   if (user && user.attachmentStyle) {
    //     this.userAttachmentStyle.set(user.attachmentStyle);
    //   } else {
    //     this.userAttachmentStyle.set(null);
    //   }
    // });
  }

  /**
   * Maneja el evento de cambio de los checkboxes en la plantilla.
   * Añade o elimina un ID de conducta del conjunto de selección.
   * @param conductId El ID de la conducta que cambió.
   * @param isChecked El nuevo estado del checkbox.
   */
  onConductChange(conductId: string, isChecked: boolean): void {
    this.selectedConductIds.update(currentSet => {
      const newSet = new Set(currentSet);
      if (isChecked) {
        newSet.add(conductId);
      } else {
        newSet.delete(conductId);
      }
      return newSet;
    });
  }
}
