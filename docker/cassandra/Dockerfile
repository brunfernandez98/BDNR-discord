FROM python:2.7-alpine

# Instalar dependencias
RUN apk --update --no-cache add \
  build-base \
  libffi-dev \
  libxml2-dev \
  libxslt-dev \
  openssl-dev \
  zlib-dev \
  git

# Instalar cqlsh
RUN pip install cqlsh==3.4.0

# Establecer variables de entorno
ENV CQLSH_NO_BUNDLED=true
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Punto de entrada del contenedor
ENTRYPOINT ["cqlsh"]