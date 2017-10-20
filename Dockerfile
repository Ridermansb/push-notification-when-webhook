FROM kyma/docker-nginx

LABEL maintainer="Ridermansb <ridermansb@gmail.com>"

COPY default /etc/nginx/sites-enabled/default
COPY dist/ /var/www/

CMD 'nginx'