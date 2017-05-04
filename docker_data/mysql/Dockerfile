FROM mysql:latest
ADD charset.cnf /etc/mysql/conf.d/charset.cnf
COPY dump.sql /docker-entrypoint-initdb.d/dump.sql