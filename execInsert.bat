@echo off

set DOCKER_CONTAINER_NAME=infallible_jones
set JSON_FILE_PATH=mockData.json
set INSERT_QUERY_FILE=insert_query.cql
set CQLSH_COMMAND=docker exec -it %DOCKER_CONTAINER_NAME% cqlsh cassandra 9042 --cqlversion=3.4.6

REM Copiar el archivo insert_query.cql al contenedor de Docker
docker cp %INSERT_QUERY_FILE% %DOCKER_CONTAINER_NAME%:/insert_query.cql

REM Ejecutar el archivo insert_query.cql utilizando cqlsh en el contenedor de Docker
%CQLSH_COMMAND% -f /insert_query.cql