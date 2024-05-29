# Planificacion del proyecto
## SPRINT 1
Del 29/1/2024 al 02/02/2024

### Planificación y Configuración Inicial
- Refinamos la idea del proyecto. 
- Creación del repositorio en GitHub. 
- Configuración inicial en Taiga con la creación del backlog.

- Vinculamos todas las partes de los Dockers entre sí para asegurar un entorno de producción funcional tanto en Linux como en Windows.
- Definimos la estructura de la tabla de usuarios de la base de datos.

### Diseño y Desarrollo Front-End
- Iniciamos el diseño móvil en Figma para la landing page y la pantalla de próximos eventos.
- Continuamos con el diseño móvil en Figma para el menú de navegación y la pantalla de chat.
- Diseñamos el login y el registro.
- Introdujimos el uso de Tailwind CSS para el diseño de la página de eventos.
- Comenzamos con tutoriales de React y el desarrollo de la interfaz de usuario.

### Conexión con APIs y Desarrollo Back-End
- Implementamos la conexión con Spotify utilizando Node.js y Laravel.
- Solucionamos problemas con Docker para asegurar que la integración funcionara correctamente.
- Aseguramos que la conexión con la API de Spotify estuviera 100% operativa.


## SPRINT 2

Del 05/02/2024 al 09/02/2024

### Web Scraping
Inicialmente, implementamos técnicas de web scraping utilizando JavaScript y Python, enfocándonos especialmente en la plataforma Viagogo. Sin embargo, decidimos descartar el web scraping en favor de utilizar APIs oficiales para obtener los datos necesarios.

### Autenticación y API
Registramos la API utilizando email y contraseña.
Implementamos y completamos la autenticación con Google para asegurar un correcto almacenamiento de los datos.
Comenzamos la documentación de los endpoints usando Swagger y OpenAPI para asegurar una clara especificación de nuestras APIs.

### Desarrollo Front-End
Creamos la landing page para móvil utilizando React.
Diseñamos en Figma las pantallas móviles para perfil, login y registro.
Desarrollamos la pantalla de eventos y el menú de navegación para móvil con React.
Mejoramos el menú y diseñamos detalladamente un evento específico en Figma.


### Interacción con APIs
Estudiamos y utilizamos la API de Ticketmaster para obtener datos de eventos.
Implementamos fetch a la API de Ticketmaster y guardamos los datos en la base de datos.
Usamos Axios en React para realizar fetch a un JSON estático y a la API de la plataforma de tickets de conciertos, asegurando la correcta integración de datos en nuestra aplicación.


### Back-End y Conexión Front-Back
Cambiamos el fetch de Laravel a Node.js para mejorar la integración y eficiencia del proyecto.
Añadimos filtros en el fetch para evitar la repetición de eventos y optimizar la gestión de datos.


### Problemas y Soluciones
No pudimos subir la aplicación a producción debido a la falta de espacio en los laboratorios. Estamos preparando una máquina Oracle para solucionar este problema.


**Al finalizar el SPRINT, logramos tener
una base sólida para la aplicación, con varios componentes esenciales desarrollados y la integración de datos mediante APIs avanzando conforme a lo planificado.**


## SPRINT 3
Del 12/02/2024 al 16/02/2024

### Objetivo del Sprint
Levantar la máquina Oracle y configurar el login/register normal y con Spotify.

### Desarrollo Back-End
- Implementamos el login y manejo de tokens en el back-end con Spotify y Google.
- Configuramos el scheduling en Node.js para hacer fetch a la API de Ticketmaster a las 00:00 y 12:00, y eliminar eventos pasados cada hora.
- Desplegamos la aplicación en Oracle Cloud utilizando Docker.

### Desarrollo Front-End
- Desarrollamos el login y manejo de tokens en el front-end con Spotify y Google.
- Agregamos el manejo de datos de usuario y tokens en el front-end.
- Mejoramos la accesibilidad del menú, añadimos contextos de React para variables globales y controlamos el estado de usuario logueado.

### Mejoras y Corrección de Errores

#### Login y Registro:
- Añadimos un loader cuando el usuario hace clic en login.
- Registramos la fetch API de Spotify, manejamos las peticiones asíncronas y resolvimos errores de fetch en componentes React.
- Solucionamos problemas de clases en SVG distintas y variables globales para mejorar la navegación autenticada.

#### Perfil y Eventos:
- Mejoramos la pantalla de perfil y completamos el diseño de la pantalla de evento individual.
- Ajustamos el scroll que afectaba el menú y mejoramos la accesibilidad general del menú.

#### Integración y Despliegue:
- Ayudamos a resolver problemas con las rutas para poner en producción con Pedro.
- Solucionamos bugs relacionados con fetch y la gestión de datos en el contexto de React.


### Revisión del Sprint
Implementamos exitosamente el login/register con Spotify y Google, mejoramos la accesibilidad y usabilidad del menú y las pantallas de perfil y eventos, y desplegamos la aplicación en Oracle Cloud. Además, resolvimos varios errores y optimizamos la funcionalidad del fetch de datos.

**Al finalizar el SPRINT, logramos establecer una robusta autenticación con Spotify y Google, mejorar la experiencia de usuario en el front-end, y realizar el despliegue en un entorno de producción sólido, aunque enfrentamos y resolvimos diversos problemas técnicos.**

## SPRINT 4
Del 17/02/2024 al 23/02/2024

### Desarrollo Back-End
- Corrección de errores y problemas con los archivos .env.
- Implementación de la API para la gestión de seguidores.
- Modificación del scheduling para almacenar eventos en lugar de borrarlos.
- Creación de las API para eventos, likes y comentarios.
- Implementación de la API para la publicación de posts con imágenes.
- Recuperación de la clave privada para el servidor.
- Finalización de la base de datos MongoDB e inicio del almacenamiento de imágenes.
- Correcciones en las actions y despliegue de contenedores Docker para MongoDB y MongoDB Express.
- Implementación de funcionalidades de likes y dislikes en eventos para usuarios.

### Desarrollo Front-End
- Finalización del diseño de la pantalla de chat individual en Figma.
- Corrección del componente del logo para que enlace a la ruta /events.
- Actualización de la pantalla de perfil de usuario.
- Implementación de funcionalidades para mostrar seguidores y seguidos en el perfil y en la pantalla de evento individual.
- Finalización del diseño de las pantallas de "amigos" y "subir post" en Figma.

### Mejoras y Corrección de Errores
- Solución de errores relacionados con Google login.
- Corrección de problemas con la landing page.
- Corrección de bugs en solicitudes GET y DELETE con MongoDB.
- Realización de pruebas para asegurar el correcto funcionamiento de la aplicación.


### Revisión del Sprint
En el Sprint 4 se avanzó considerablemente en el desarrollo del proyecto. Se completaron varias funcionalidades importantes, como la gestión de seguidores, la publicación de posts con imágenes, la implementación de likes y dislikes en eventos, y el diseño de nuevas pantallas. También se solucionaron errores y se realizaron mejoras en el rendimiento de la aplicación.

**Al finalizar el Sprint, se logró un progreso significativo en la implementación de las funcionalidades principales del proyecto, aunque aún quedan algunas tareas pendientes para completar el desarrollo.**

## SPRINT 5
Del 29/04/2024 al 10/05/2024

### Desarrollo Back-End
- Actualización del componente "menu" para que la ruta siempre comience por /events.
- Adición del componente "menu" en la pantalla de evento individual.
- Ampliación de la información en la pantalla de evento individual.
- Adición de un encabezado en la pantalla de evento individual para seguir y salir del evento.
- Guardado de imágenes comprimidas en Node.
- Solución de problemas de login con JSON en contexto.
- Integración de información de la cuenta de Spotify.
- Implementación de un toggle para el botón "seguir" en la pantalla de evento individual.
- Corrección de errores de almacenamiento local.
- Inicio de la migración de React a Nuxt.
- Corrección de datos de login.
- Solución de problemas de "like" a eventos con usuarios autentificados que se comunican con MongoDB.
- Implementación del proxy inverso.
- Creación de un servidor de preproducción para realizar pruebas del proxy inverso.
- Implementación de la función para publicar un post.
- Implementación de la función para mostrar los posts en el perfil.
- Implementación de un menú desplegable de opciones de post.
- Inicio de la implementación del buscador de usuarios para iniciar un chat.

### Desarrollo Front-End
- Actualización del componente "menu" para que la ruta siempre comience por /events.
- Adición del componente "menu" en la pantalla de evento individual.
- Ampliación de la información en la pantalla de evento individual.
- Adición de un encabezado en la pantalla de evento individual para seguir y salir del evento.
- Implementación de un toggle para el botón "seguir" en la pantalla de evento individual.
- Inicio de la migración de React a Nuxt.
- Solución de problemas de "like" a eventos con usuarios autentificados que se comunican con MongoDB.
- Implementación de la función para publicar un post.
- Implementación de la función para mostrar los posts en el perfil.
- Implementación de un menú desplegable de opciones de post.
- Inicio de la implementación del buscador de usuarios para iniciar un chat.

### Mejoras y Corrección de Errores
- Solución de errores de login.
- Corrección de problemas con la landing page.
- Corrección de bugs en solicitudes GET y DELETE con MongoDB.
- Realización de pruebas para asegurar el correcto funcionamiento de la aplicación.
- Arreglo del docker-compose.
- Adaptación de todos los iconos.
- Corrección de errores de color de fondo.
- Modificación del menú para mejorar la accesibilidad.
- Programación de la pantalla de chat individual.
- Programación de la pantalla de todos los chats.
- Pensamiento en la estructura del chat y la tecnología a utilizar.
- Ayuda a Raúl con actions y proxy inverso.
- Comienzo de la implementación del chat.
- Creación del servidor de preproducción.
- Diseño de la pantalla de posts.


### Revisión del Sprint
En el Sprint 5 se avanzó considerablemente en el desarrollo del proyecto. Se completaron varias funcionalidades importantes, como la actualización del componente "menu", la ampliación de la información en la pantalla de evento individual, la implementación del toggle para el botón "seguir", la migración de React a Nuxt, la implementación de la función para publicar un post, la implementación de la función para mostrar los posts en el perfil, la implementación de un menú desplegable de opciones de post, el inicio de la implementación del buscador de usuarios para iniciar un chat, la solución de errores de login, la corrección de problemas con la landing page, la corrección de bugs en solicitudes GET y DELETE con MongoDB, la realización de pruebas para asegurar el correcto funcionamiento de la aplicación, el arreglo del docker-compose, la adaptación de todos los iconos, la corrección de errores de color de fondo, la modificación del menú para mejorar la accesibilidad, la programación de la pantalla de chat individual, la programación de la pantalla de todos los chats, el pensamiento en la estructura del chat y la tecnología a utilizar, la ayuda a Raúl con actions y proxy inverso, el comienzo de la implementación del chat, la creación del servidor de preproducción y el diseño de la pantalla de posts.

**Al finalizar el Sprint, se logró un progreso significativo en la implementación de las funcionalidades principales del proyecto, aunque aún quedan algunas tareas pendientes para completar el desarrollo.**


## SPRINT 6
Del 13/05/2024 al 24/05/2024

### Desarrollo Back-End
- Arreglo de errores en la función para mostrar los posts en el perfil.
- Implementación de la función para eliminar un post.
- Corrección de errores en la función para dar y quitar likes a un post.
- Implementación de la función para mostrar los seguidores de un evento.
- Corrección de errores en la función para mostrar los seguidos de un usuario.
- Implementación de la función para seguir a un usuario.
- Corrección de errores en la función para dejar de seguir a un usuario.
- Implementación de la función para buscar usuarios.
- Corrección de errores en la función para mostrar los chats de un usuario.
- Implementación de la función para enviar mensajes en un chat.
- Corrección de errores en la función para mostrar los mensajes de un chat.
- Implementación de la función para eliminar un mensaje de un chat.
- Implementación de la función para eliminar un chat.
- Corrección de errores en la función para mostrar las notificaciones de un usuario.
- Implementación de la función para marcar una notificación como leída.
- Corrección de errores en la función para eliminar una notificación.
- Implementación de la función para subir una imagen de perfil.
- Corrección de errores en la función para mostrar la imagen de perfil de un usuario.
- Implementación de la función para eliminar la imagen de perfil de un usuario.


### Desarrollo Front-End
- Arreglo de errores en la pantalla de perfil.
- Implementación de la pantalla para eliminar un post.
- Corrección de errores en la pantalla para dar y quitar likes a un post.
- Implementación de la pantalla para mostrar los seguidores de un evento.
- Corrección de errores en la pantalla para mostrar los seguidos de un usuario.
- Implementación de la pantalla para seguir a un usuario.
- Corrección de errores en la pantalla para dejar de seguir a un usuario.
- Implementación de la pantalla para buscar usuarios.
- Corrección de errores en la pantalla para mostrar los chats de un usuario.
- Implementación de la pantalla para enviar mensajes en un chat.
- Corrección de errores en la pantalla para mostrar los mensajes de un chat.
- Implementación de la pantalla para eliminar un mensaje de un chat.
- Implementación de la pantalla para eliminar un chat.
- Corrección de errores en la pantalla para mostrar las notificaciones de un usuario.
- Implementación de la pantalla para marcar una notificación como leída.
- Corrección de errores en la pantalla para eliminar una notificación.
- Implementación de la pantalla para subir una imagen de perfil.
- Corrección de errores en la pantalla para mostrar la imagen de perfil de un usuario.
- Implementación de la pantalla para eliminar la imagen de perfil de un usuario.

### Revisión del Sprint
**Se avanzó considerablemente en la implementación de las funcionalidades del proyecto, enfocándose en la parte de usuarios y sus interacciones.**