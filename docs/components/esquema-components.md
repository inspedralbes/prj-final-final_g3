# Esquema de components


### Que tenim a la carpeta de components ?

*   Components
    
*   Icones
    


### Que components hi ha?

#### CardEvent: 
Este componente es cada carta de un evento y lo usamos en la pantalla de Eventos.

<img src="../images/CardEvent.png" alt="" >


#### CardUser:
Mostramos el avatar y el nombre de un usuario y la opcion de poder seguirlo. Este componente lo usamos en el buscador de usuarios de Header.vue y en la pantalla de perfil.


#### EventosProfile:
Si el usuario no sigue ningun evento aparece una frase conforme este usuario no sigue eventos, y sino muestra una pequeña preview de cada evento al que sigue. Esto se muestra en la pantalla de perfil.


#### Header:
Seccion donde mostramos el Logo y el nombre de Spottunes, una lupa para buscar usuarios y un boton para hacer logout en el caso de que el usuario este logeado. Lo utilizamos en la pantalla de Eventos y Perfil.


#### Loader:
Este componente es el del loader que hemos utilizado en toda la aplicacion. Lo utilizamos en UserCardEvent, add-chat, chats, completar, edit-profile, login, register, google, spotify, events, perfil y post.


#### LoginMethods:
Aqui tenemos los diferentes metodos para hacer login en nuestra aplicacion, como google, spotify o spottunes. Lo utilizamos en Login y Register.


#### Logo:
Este es el svg de nuestro logo. Lo utilizamos en Header y Join.


#### Logout:
Aqui tenemos el icono y las funciones para hacer logout en la aplicacion. Lo utilizamos en el componente Header.


#### Map:
Este componente contiene un mapa para poder filtrar los conciertos por distancia de tu ubicacion.


#### Menu:
Este es el menu de navegacion de nuestra aplicacion, lo utilizamos en casi todas las paginas para que el usuario pueda moverse libremente entre pagina y pagina.


#### OpenImage:
Este es un componente que utilizamos como modal para poder ampliar y ver mejor las imagenes de los post. Lo utulizamos en PostsProfile al hacer click en la imagen del post.


#### PostDropDown:
Desplegable para manejar la eliminacion de un post creado por el usuario. Lo utilizamos en PostsProfile.


#### PostsProfile:
Mostramos todos los posts creadors por el usuario en la pantalla de perfil.


#### ReplyPost:
Es un modal que utilizamos para dejar comentarios en un post de forma rapida. Lo utilizamos en PostsProfile.


#### UserCardEvent:
Muestra el avatar, nombre y opcion de seguir en la pantalla de un evento individual. Lo usamos al mostrar los usuarios que siguen un evento.













