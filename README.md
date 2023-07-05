# Vigilante

Vigilante es un software de código abierto diseñado para brindar apoyo a partidos políticos en la fiscalización de los conteos de elecciones. Su objetivo es facilitar la tarea de llevar un seguimiento transparente y preciso de los resultados electorales a nivel de distrito, municipio, centro de votación y mesa de votación.

## Características principales

- **Conteo de votos**: Permite recopilar y registrar los votos emitidos en cada mesa de votación, así como llevar un seguimiento y totalización de los resultados en niveles superiores.
- **Anotaciones diversas**: Ofrece la posibilidad de realizar anotaciones relacionadas con incidentes y observaciones que puedan surgir en cualquier nivel del proceso electoral.
- **Registro de impugnaciones**: Facilita el registro y seguimiento de las impugnaciones presentadas en cualquiera de los niveles, garantizando la transparencia y el cumplimiento de los procedimientos legales.

## Tecnologías utilizadas

- Backend: Typescript / DynamoDB
- Frontend: Vue.js / Typescript

# Configuración para desarrollo

Este repositorio trae incorporado un Docker Compose para facilitar que nuevos programadores se incorporen al proyecto. Para poder configurar tu entorno de desarrollo debes hacer lo siguiente:

1. Instalar [Docker Desktop](https://docs.docker.com/engine/install/).
2. Renombrar el archivo `.env.dist` como `.env` y configurar las variables propias de tu entorno como puertos y usuarios (si estás en sistema Mac o Windows, USER_ID=0 y GROUP_ID=0 funcionan bien; si estás en Linux seguro sabes qué hacer).
3. Arrancar el entorno con `docker compose up -d --build`.

## Contribución

¡Se aceptan contribuciones! Si deseas contribuir a Vigilante, por favor sigue los siguientes pasos:

1. Crea un fork de este repositorio.
2. Crea una rama con un nombre descriptivo: `git checkout -b mi-nueva-funcionalidad`
3. Realiza tus cambios y realiza los commits: `git commit -am 'Agrega una nueva funcionalidad'`
4. Envía tus cambios al repositorio remoto: `git push origin mi-nueva-funcionalidad`
5. Envía un Pull Request a la rama `develop` detallando tus cambios.

## Código de Conducta

Por favor, lee nuestro [Código de Conducta](CODE_OF_CONDUCT.md) para conocer las normas de comportamiento esperadas en este proyecto. Nos esforzamos por mantener un entorno colaborativo, respetuoso y acogedor para todos los participantes.

## Licencia

Vigilante se distribuye bajo la licencia [GNU General Public License v3.0 (GPL-3.0)](https://opensource.org/licenses/GPL-3.0). Consulta el archivo [LICENSE](https://github.com/jatitoam/vigilante/blob/main/LICENSE) para más información.
