FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
#ADD test-site.local.conf /etc/nginx/conf.d/test-site.local.conf

ADD net.conf /etc/nginx/conf.d/net.conf
#RUN sh -c "ln -s /etc/nginx/sites-available/trcorp.local.conf /etc/nginx/sites-enabled/trcorp.local.conf"

RUN apt-get update
RUN apt-get install -y mc nano mysql-client

#ADD dump.sql /tmp/dump.sql
#RUN mysql -u root -paptito -h db aptito_current < /tmp/dump.sql

#RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
#RUN apt-get install -y nodejs
WORKDIR /tmp
#CMD npm install
#CMD mysql -uroot -paptito -h db aptito_current < dump.sql && nginx -g 'daemon off;'
CMD nginx -g 'daemon off;'
#RUN mysql -u trcorp.local -p123456 -h db trcorp.local < /tmp/dump.sql
