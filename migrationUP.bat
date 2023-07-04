@echo off

set DOCKER_CONTAINER_NAME=cassandra
set CQLSH_COMMAND=docker exec -it %DOCKER_CONTAINER_NAME% cqlsh cassandra 9042 --cqlversion=3.4.6

%CQLSH_COMMAND% -e "CREATE TABLE discord.messages (id TIMEUUID, server_id INT, channel_id INT, user_id INT, text TEXT, hashtags SET<TEXT>, links SET<TEXT>, mentioned_users SET<INT>, pinned BOOLEAN, creation_date TIMESTAMP, PRIMARY KEY ((server_id, channel_id), creation_date, id));"

echo Table created successfully.
