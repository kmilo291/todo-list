# 📱 Todo App -- Ionic + Angular + Apache Cordova

![Angular](https://img.shields.io/badge/Angular-20-red)
![Ionic](https://img.shields.io/badge/Ionic-8-blue)
![Cordova](https://img.shields.io/badge/Cordova-11-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

------------------------------------------------------------------------

# 📌 Descripción

Esta aplicación es una **Todo List móvil** desarrollada con **Ionic
Framework 8**, **Angular 20** y **Apache Cordova** como runtime nativo.

La aplicación permite:

-   Crear tareas
-   Editar tareas
-   Eliminar tareas
-   Filtrar tareas por estado
-   Filtrar tareas por categoría
-   Buscar tareas por texto
-   Gestionar categorías
-   Cargar datos de ejemplo
-   Ejecutar tareas pesadas usando Web Workers

El proyecto implementa **Clean Architecture (Ports & Adapters)** para
separar claramente:

-   Lógica de negocio
-   Infraestructura
-   Interfaz de usuario

La persistencia se realiza mediante **LocalStorage**, aunque la
arquitectura permite cambiar fácilmente a:

-   SQLite
-   IndexedDB
-   API REST

------------------------------------------------------------------------

# 🏗 Arquitectura del Proyecto

Este proyecto se estructuró siguiendo una aproximación de **Clean Architecture**, principalmente con el objetivo de mantener separada la lógica de negocio de la infraestructura y de la interfaz de usuario.

Aunque para una aplicación de este tamaño podría haberse utilizado una estructura más simple, se optó por esta arquitectura para demostrar cómo el proyecto podría escalar o adaptarse fácilmente a nuevos proveedores de datos (por ejemplo SQLite o una API REST).

    src/app
    │
    ├── core
    │   ├── models
    │   ├── ports
    │   └── use-cases
    │
    ├── infrastructure
    │   ├── repositories
    │   ├── services
    │   └── background
    │
    └── presentation
        ├── pages
        ├── facades
        └── services

------------------------------------------------------------------------

## Core

Contiene la lógica de negocio pura.

Incluye:

-   Modelos de dominio
-   DTOs
-   Casos de uso
-   Puertos (interfaces)

Ejemplos de casos de uso:

    CreateTodo
    DeleteTodo
    UpdateTodo
    GetTodosWithCategory
    SeedData
    ExecuteHeavyTask

Los casos de uso **no dependen de Angular ni Ionic**.

------------------------------------------------------------------------

## Infrastructure

Contiene las implementaciones concretas de los puertos definidos en el
dominio.

Repositorios implementados:

    LocalStorageTodoRepository
    LocalStorageCategoryRepository

Otros componentes importantes:

    UuidIdGeneratorService
    RemoteConfigService
    WorkerHeavyTaskAdapter

------------------------------------------------------------------------

## Presentation

Contiene la interfaz de usuario.

Páginas principales:

    Todos
    Categories
    Settings
    Tabs

Se utilizan **facades** para desacoplar la UI de los casos de uso.

------------------------------------------------------------------------

# ⚙️ Requisitos del entorno

Para ejecutar el proyecto se requiere:

-   Node.js 18 o superior
-   npm 9 o superior
-   Ionic CLI 7 o superior
-   Apache Cordova 11 o superior

Instalar Ionic y Cordova globalmente:

``` bash
npm install -g @ionic/cli cordova
```

------------------------------------------------------------------------

# 📦 Instalación del proyecto

Clonar el repositorio:

``` bash
git clone https://github.com/kmilo291/todo-app.git
```

Entrar al proyecto:

``` bash
cd todo-app
```

Instalar dependencias:

``` bash
npm install
```

------------------------------------------------------------------------

# 🚀 Ejecutar la aplicación

## Modo desarrollo (web)

``` bash
ionic serve
```

Esto iniciará el servidor en:

    http://localhost:8100

------------------------------------------------------------------------

# 📱 Ejecutar en Android

Requisitos adicionales:

-   Android Studio
-   Android SDK
-   JDK 11

Agregar plataforma:

``` bash
ionic cordova platform add android
```

Compilar aplicación:

``` bash
ionic cordova build android
```

Ejecutar en dispositivo:

``` bash
ionic cordova run android
```

APK generado en:

    platforms/android/app/build/outputs/apk/debug/app-debug.apk

------------------------------------------------------------------------

# 🍎 Ejecutar en iOS

Requisitos:

-   macOS
-   Xcode
-   CocoaPods
-   Apple ID configurado

Agregar plataforma:

``` bash
ionic cordova platform add ios
```

Compilar:

``` bash
ionic cordova build ios
```

Abrir proyecto en Xcode:

    platforms/ios/App.xcworkspace

Luego ejecutar desde Xcode.

------------------------------------------------------------------------

# 🧪 Testing

El proyecto utiliza:

-   Jasmine
-   Karma
-   Angular TestBed

Ejecutar pruebas:

``` bash
npm run test
```

Ejemplo implementado:

  create-todo.use-case.spec.ts

------------------------------------------------------------------------

# ⚡ Web Worker

Se implementó un **Web Worker** para ejecutar tareas pesadas sin
bloquear la interfaz de usuario.

Caso de uso:

    ExecuteHeavyTask

El worker realiza cálculos intensivos para demostrar procesamiento en
segundo plano.

------------------------------------------------------------------------

# 🌐 Firebase Remote Config

La aplicación utiliza **Firebase Remote Config** para habilitar o
deshabilitar funcionalidades dinámicamente.

Ejemplo de flag:

    enable_config_settings

Este flag controla la visibilidad de la pestaña **Settings**.

------------------------------------------------------------------------

# 🌱 Datos de ejemplo

La aplicación incluye un caso de uso:

    SeedData

Permite cargar tareas y categorías de ejemplo desde la sección
**Settings**.

El sistema evita duplicados verificando si ya existen datos almacenados.

------------------------------------------------------------------------

# 🔍 Sistema de filtros

La pantalla principal permite:

### Filtrar por estado

-   Todas
-   Completadas
-   Pendientes

### Filtrar por categoría

Seleccionando una categoría específica.

### Buscar tareas

Busca coincidencias en:

-   título de la tarea
-   nombre de la categoría

El filtrado se implementa en:

    TodoFilterService

------------------------------------------------------------------------

# 🛠 Cambios realizados

Durante el desarrollo se implementaron las siguientes mejoras:

-   Implementación de **Clean Architecture**
-   Uso de **Ports & Adapters**
-   Implementación de **facades**
-   Generador de IDs basado en **UUID**
-   Implementación de **Web Workers**
-   Integración con **Firebase Remote Config**
-   Sistema de filtrado avanzado
-   Comunicación entre páginas mediante **RxJS**
-   Mejora visual de listas
-   Implementación de sección **About Developer**

------------------------------------------------------------------------

# 🧠 Decisiones de arquitectura

Se adoptó **Clean Architecture** para lograr:

-   separación de responsabilidades
-   desacoplamiento entre capas
-   facilidad de testing
-   escalabilidad futura

Flujo de arquitectura:

    UI → Facade → UseCase → Repository → Storage

Esto permite cambiar LocalStorage por SQLite o una API REST sin
modificar el dominio.

------------------------------------------------------------------------

# 🚀 Mejoras futuras

Posibles mejoras para el proyecto:

-   Persistencia con SQLite
-   Sincronización con API REST
-   Soporte offline-first
-   Autenticación de usuario
-   Notificaciones push
-   Sincronización en la nube
-   Modo oscuro completo
-   Migración a Capacitor

------------------------------------------------------------------------

# 📚 Tecnologías utilizadas

-   Angular 20
-   Ionic Framework 8
-   Apache Cordova
-   TypeScript
-   RxJS
-   Firebase Remote Config
-   Jasmine
-   Karma
-   ESLint

------------------------------------------------------------------------

# 🧠 Preguntas y respuestas sobre el desarrollo

## ¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?

Uno de los retos más importantes fue implementar una arquitectura desacoplada dentro de una aplicación construida con Ionic y Angular. Normalmente este tipo de aplicaciones terminan bastante acopladas al framework, por lo que estructurar el proyecto usando **Clean Architecture basada en Ports & Adapters** requirió pensar bien cómo separar cada capa.

Algunos de los desafíos principales fueron:

- Diseñar una arquitectura que permitiera separar correctamente la lógica de negocio de la interfaz de usuario.
- Conectar las diferentes capas del proyecto (**core, infrastructure y presentation**) sin perder la claridad en las responsabilidades.
- Mantener compatibilidad entre **Apache Cordova y las versiones recientes de Angular**, ya que algunas configuraciones requieren ajustes para funcionar correctamente.
- Diseñar los flujos de la aplicación de forma que la lógica fuera clara, reutilizable y fácil de extender en el futuro.

Aunque tomó algo más de tiempo al inicio, esta estructura facilita bastante el mantenimiento y la evolución del proyecto.

---

## ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

Aunque la aplicación no realiza operaciones especialmente pesadas, se implementaron algunas técnicas de optimización con el objetivo de demostrar cómo se podrían manejar escenarios más exigentes en una aplicación móvil híbrida.

### Angular Signals y Computed Signals

Se utilizaron **Signals y Computed Signals de Angular** para manejar el estado de la aplicación de forma reactiva. Esto ayuda a que la interfaz solo se vuelva a renderizar cuando realmente cambian los datos relevantes, evitando renders innecesarios.

### Web Workers

También se implementó un **Web Worker** para ejecutar tareas pesadas en segundo plano. De esta forma los cálculos intensivos no bloquean el hilo principal de la aplicación y la interfaz se mantiene fluida.

Esto es especialmente útil en aplicaciones híbridas móviles donde el rendimiento puede verse afectado si todo el procesamiento ocurre en el hilo principal.

---

## ¿Cómo aseguraste la calidad y mantenibilidad del código?

La mantenibilidad del proyecto se logró principalmente a través de la arquitectura del sistema.

El proyecto está organizado siguiendo **Clean Architecture**, separando claramente:

- Dominio (`core`)
- Infraestructura (`infrastructure`)
- Presentación (`presentation`)

Esto permite cambiar implementaciones sin afectar la lógica principal de la aplicación.

El flujo principal de dependencias queda de la siguiente forma:

  UI → Facade → UseCase → Repository → Storage


Además de esto:

- Se definieron **puertos (interfaces)** para desacoplar la infraestructura del dominio.
- Se utilizaron **facades** para evitar que la UI dependa directamente de los casos de uso.
- Los **DTOs y casos de uso** están organizados de forma independiente, lo que facilita la escritura de pruebas.

Gracias a esta organización el proyecto queda preparado para crecer sin volverse difícil de mantener. Por ejemplo, sería posible cambiar la persistencia de LocalStorage a SQLite o a una API REST sin modificar la lógica principal de la aplicación.

------------------------------------------------------------------------

# 👨‍💻 Autor

**Camilo Ramirez**

Software Developer

Especializado en:

-   Clean Architecture
-   Angular
-   Ionic
-   Aplicaciones móviles híbridas

---

## Notas

Este proyecto fue desarrollado como parte de una prueba técnica y busca mostrar principalmente la estructura de la arquitectura, la separación de responsabilidades y algunas técnicas de optimización aplicables en aplicaciones móviles híbridas construidas con Ionic y Angular.
