# 📱 Todo App – Ionic + Angular + Apache Cordova

Este proyecto corresponde a una aplicación móvil de gestión de tareas (Todo List) desarrollada con Ionic Framework 8, Angular 20 y Apache Cordova como runtime nativo.

La aplicación implementa una arquitectura basada en Clean Architecture (Ports & Adapters), separando claramente:

- Core (casos de uso y modelos de dominio)
- Infrastructure (repositorios)
- Presentation (páginas Ionic)
- Persistencia mediante localStorage

La gestión de dependencias del proyecto se realiza mediante npm.

--------------------------------------------------
🚀 REQUISITOS DEL ENTORNO
--------------------------------------------------

Requisitos generales:

- Node.js v18 o superior (recomendado LTS)
- npm v9 o superior
- Ionic CLI v7 o superior
- Apache Cordova v11 o superior
- Git

Instalación global de Ionic y Cordova:

npm install -g @ionic/cli cordova

Instalación de dependencias del proyecto:

Desde la raíz del proyecto:

npm install

Ejecutar en modo desarrollo (web):

ionic serve

--------------------------------------------------
📦 ARQUITECTURA DEL PROYECTO
--------------------------------------------------

El proyecto sigue una estructura inspirada en Clean Architecture.

src/app/
│
├── core/
│   ├── models/
│   ├── ports/
│   └── use-cases/
│
├── infrastructure/
│   └── repositories/
│
└── presentation/
    └── pages/

CORE

Contiene la lógica de negocio pura:

- DTOs
- Modelos de dominio
- Casos de uso
- Puertos (interfaces de repositorio)

Ejemplos:
- CreateTodo
- DeleteTodo
- GetTodosWithCategory
- UpdateTodo

INFRASTRUCTURE

Implementaciones concretas de los repositorios definidos en los puertos.

Actualmente utiliza:

- LocalStorageTodoRepository
- LocalStorageCategoryRepository

La persistencia se realiza mediante localStorage.

PRESENTATION

Páginas Ionic organizadas por módulos:

- Todos
- Categories
- Settings
- Tabs

--------------------------------------------------
📱 ANDROID
--------------------------------------------------

Requisitos adicionales:

- Android Studio
- Android SDK
- JDK 11
- Variables de entorno configuradas:
  ANDROID_HOME
  JAVA_HOME

Compilación:

ionic cordova build android

Ejecución:

ionic cordova run android

APK generado:

platforms/android/app/build/outputs/apk/debug/app-debug.apk

--------------------------------------------------
🍎 iOS
--------------------------------------------------

Requisitos adicionales:

- macOS
- Xcode 14 o superior
- CocoaPods
- Apple ID configurado en Xcode

Compilación:

ionic cordova build ios

Ejecución:

ionic cordova run ios

Proyecto generado:

platforms/ios/

Puede abrirse en Xcode mediante:

platforms/ios/*.xcworkspace

--------------------------------------------------
📦 GENERACIÓN DE ARCHIVE (iOS)
--------------------------------------------------

Desde Xcode:

1. Abrir el proyecto
2. Seleccionar "Any iOS Device"
3. Ir a Product → Archive
4. Visualizar en Organizer

Archivo generado:

*.xcarchive

Nota:
La exportación de un archivo IPA requiere una cuenta Apple Developer activa.

--------------------------------------------------
🧪 TESTING
--------------------------------------------------

El proyecto utiliza:

- Jasmine
- Karma
- Angular TestBed

Ejecutar pruebas:

npm run test

Ejemplo implementado:
create-todo.use-case.spec.ts

--------------------------------------------------
🔐 CONFIGURACIÓN DE SEGURIDAD ANDROID
--------------------------------------------------

Se incluye el archivo:

resources/android/xml/network_security_config.xml

Actualmente permite tráfico en texto plano únicamente para:

localhost

--------------------------------------------------
⚙️ BUILD PRODUCCIÓN
--------------------------------------------------

npm run build

Genera salida optimizada en:

www/

--------------------------------------------------
📚 TECNOLOGÍAS UTILIZADAS
--------------------------------------------------

- Angular 20
- Ionic 8
- Apache Cordova
- TypeScript
- RxJS
- ESLint
- Jasmine + Karma

--------------------------------------------------
📝 NOTAS IMPORTANTES
--------------------------------------------------

- El proyecto utiliza inyección de dependencias basada en puertos.
- Los casos de uso no dependen de Ionic ni Angular.
- La persistencia puede reemplazarse fácilmente por SQLite o API REST sin modificar el dominio.
- El proyecto está preparado para escalabilidad futura.

--------------------------------------------------
👨‍💻 AUTOR
--------------------------------------------------

Proyecto demo con enfoque en arquitectura limpia aplicada a aplicaciones móviles híbridas.
