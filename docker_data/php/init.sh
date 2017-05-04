#!/bin/bash
cd /app
npm install
composer install
php-fpm --nodaemonize