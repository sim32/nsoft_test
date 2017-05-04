<?php
$host       = 'db';
$db         = 'aptito_current';
$user       = 'root';
$pass       = 'aptito';
$charset    = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

return new PDO($dsn, $user, $pass, $opt);