@echo off

set DOCKER_CONTAINER_NAME=infallible_jones
set CQLSH_COMMAND=docker exec -it %DOCKER_CONTAINER_NAME% cqlsh cassandra 9042 --cqlversion=3.4.6

%CQLSH_COMMAND% -e "DROP TABLE discord.messages"

echo Table dropped successfully.