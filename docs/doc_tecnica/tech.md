---
title: Documentació tècnica
---

# Documentació tècnica

Aquest document té com a objectiu proporcionar una guia tècnica detallada sobre els diferents aspectes de Spottunes. És una referència dissenyada per ajudar els desenvolupadors a comprendre i gestionar eficientment el projecte.

## Arquitectura de l'aplicació

L'arquitectura de l'aplicació està dissenyada per ser modular i escalable, distribuint les responsabilitats entre diversos components especialitzats. A continuació es presenta un esquema gràfic i una descripció de cada component, incloent les connexions i la informació que es transmet entre ells.

<img src="../images/arquitectura.png" alt="">

## Rutes de l'aplicació

## Esquema d'esdeveniments (sockets)

## Esquema de la base de dades

### SQL

### Mongo

## Esquema de components

## Documentació de frontend

## Documentació de backend

## Proxy invers

La nostra aplicació web s'ha desplegat amb Docker, per tant, per facilitar la comunicació entre els diferents dockers i poder aplicar un certificat SSL a tots els mòduls que conté aquesta pàgina hem decidit implementar un proxy invers amb Nginx.

### Justificació de l'ús del proxy invers

- **Seguretat**: Afegint una capa addicional de seguretat amb SSL.
- **Abstracció**: Oculta la infraestructura backend.

### Arxiu de configuració

```
server {
	server_name spottunes.daw.inspedralbes.cat;

	location /{
		proxy_pass http://localhost:3000;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}

	location /pma{
		rewrite ^/pma(/.*)$ $1 break;
		proxy_pass http://localhost:9091/;
		proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
	}

	location /portainer/ {
		proxy_pass https://localhost:9443/;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
	}

#	location /mongoexpress {
#		rewrite ^/mongoexpress(/.*)$ $1 break;
#		proxy_pass http://locahost:8081/;
#               proxy_set_header Host $host;
#               proxy_set_header X-Real-IP $remote_addr;
#               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#               proxy_set_header X-Forwarded-Proto $scheme;
#	}

	location /laravel{
		proxy_pass http://localhost:8000/public;
		proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
	}

	location /node/ {
		proxy_pass http://localhost:8086/;
                proxy_http_version 1.1;
	        proxy_set_header Host $host;
	        proxy_set_header Upgrade $http_upgrade;
	        proxy_set_header Connection "upgrade";
	        proxy_cache_bypass $http_upgrade;
	}

	location /socket/{
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $host;

		proxy_pass http://localhost:8085;

		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/spottunes.daw.inspedralbes.cat/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/spottunes.daw.inspedralbes.cat/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = spottunes.daw.inspedralbes.cat) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


	server_name spottunes.daw.inspedralbes.cat;
    return 404; # managed by Certbot


}
```

### Rutes del proxy invers

- `/`: Redirigeix al port 3000. Es tracta del frontend de Nuxt montat sobre un servidor de node.
- `/pma`: Redirigeix al port 9091 al phpmyadmin.
- `/portainer/`: Redirigeix al port 9443 al portainer.
- `/laravel`: Redirigeix al port 8000, específicament a `/public`. S'encarrega de servir i dirigir les peticions d'API de Laravel i les rutes de les imatges.
- `/node/` i `/socket/`: Redirigeixen respectivament als ports 8086 i 8085, utilitzant WebSocket (al port 8086) per a la comunicació en temps real.

## Disseny

## Desplegament
