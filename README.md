# 🧠 Apego Consciente - App de Autoobservación Emocional

Bienvenido/a a **Apego Consciente**, una aplicación web desarrollada con **Angular 17+** que promueve el autoconocimiento, la gestión emocional y la toma de conciencia sobre los propios patrones afectivos. Este proyecto busca fusionar desarrollo frontend moderno con bienestar personal, brindando una experiencia accesible, intuitiva y reflexiva.

🔗 **[Demo en Vivo](https://apego-consciente.vercel.app)**  
🔗 **[Repositorio en GitHub](https://github.com/edarlinae/apego-consciente)**

---

## 📜 Descripción

**Apego Consciente** guía al usuario a través de un proceso de introspección para identificar patrones de apego, emociones dominantes y reacciones automáticas. Se trata de una herramienta útil para terapeutas, pacientes o cualquier persona interesada en su salud mental y emocional.

La aplicación está estructurada en módulos interactivos, cuestionarios y secciones de reflexión personal.

---

## ✨ Funcionalidades Principales

- 💬 **Preguntas Guiadas:** Serie de preguntas con lógica condicional que se adaptan a las respuestas del usuario.
- 📋 **Resumen Personalizado:** Resultado gráfico y textual con el tipo de apego predominante.
- 🌗 **Modo Claro y Oscuro:** Tema seleccionable, con persistencia de preferencia.
- 🌍 **Multi-idioma:** Disponible en Español e Inglés.
- 📱 **Diseño 100% Responsive:** Pensada para usarse en móviles y navegadores modernos.
- 🧭 **Navegación Fluida:** Uso de routing standalone con transiciones suaves.

---

## 📂 Estructura de Interfaces

### 🧘 Página Principal (`HomeComponent`)
- Bienvenida al usuario
- Botón para iniciar el test
- Selector de idioma y tema

### ❓ Cuestionario (`TestComponent`)
- Preguntas condicionadas con opciones múltiples
- Control de flujo según respuestas previas
- Botón para avanzar y retroceder

### 📈 Resultados (`ResultComponent`)
- Descripción del tipo de apego identificado
- Sugerencias para trabajar el estilo de apego
- Ilustraciones y colores personalizados según el resultado

### ⚙️ Configuración (`SettingsComponent`)
- Cambiar idioma
- Cambiar tema
- Borrar progreso (reset del test)

---

## 🧠 Arquitectura Técnica

### 🧩 Componentes Standalone
- Toda la aplicación usa componentes standalone (sin `NgModules`).
- Modularización clara y escalable.

### 🧮 Servicios Clave
- `ApegoService`: Gestiona el estado de respuestas y cálculo del resultado.
- `LanguageService`: Maneja la internacionalización (`i18n` simple vía JSON).
- `ThemeService`: Cambia y persiste el tema elegido.

### 🗂️ Gestión de Estado
- Uso de `BehaviorSubject` para control de tema, idioma y progreso del test.
- Persistencia opcional mediante `localStorage`.

---

## 🛠️ Tecnologías Utilizadas

| Categoría             | Tecnologías                                  |
|----------------------|----------------------------------------------|
| Framework            | Angular (v17+)                               |
| Lenguajes            | TypeScript, JavaScript (ES6+)                |
| Estilos              | SCSS, CSS3, Angular Animations               |
| Componentes UI       | Angular Standalone Components                |
| Iconografía          | Heroicons, SVGs personalizados               |
| Gestión de estado    | RxJS (BehaviorSubject), localStorage         |
| Control de versiones | Git, GitHub                                  |
| Despliegue           | Vercel                                       |

---

## 🔧 Cómo Ejecutar este Proyecto Localmente

### ✅ Requisitos Previos

- Node.js (v18 o superior)
- Angular CLI instalado globalmente

### 🚀 Instalación y Ejecución

```bash
# 1. Clona el repositorio
git clone https://github.com/edarlinae/apego-consciente.git

# 2. Entra al directorio del proyecto
cd apego-consciente

# 3. Instala las dependencias
npm install

# 4. Ejecuta el servidor de desarrollo
ng serve
Abre tu navegador en: [http://localhost:4200](http://localhost:4200)
```
---

## 👤 Contacto



¿Tienes ideas, dudas o quieres colaborar?



- 🌐 **Portfolio Web:** [mi-portfolio-blush.vercel.app](https://mi-portfolio-blush.vercel.app)

- 💼 **LinkedIn:** [alicia-caparros-masia](https://www.linkedin.com/in/alicia-caparros-masia-39aa6a357)

- 📧 **Email:** [caparrosmasiaalicia@gmail.com](mailto:caparrosmasiaalicia@gmail.com)



