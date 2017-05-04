<?php
require_once './vendor/autoload.php';
require_once './autoloader.php';

$db = include 'databaseInit.php';

$loader = new \Loader();
$klein  = new \Klein\Klein();

$loader->addNamespace('Models', __DIR__ . '/models')->register();
($klein->app())->db = $db;


$klein->respond('GET', '/', function ($req, $res, $service) {
    $service->title = 'Aptito test project';
    $service->render('view/index.phtml');
});

$klein->respond('GET', '/orders[:from]?_[:to]?.json', function ($req, $res, $service, $app) {
    $from   = $req->param('from');
    $to     = $req->param('to');

    $dateTimeValidateOptions = [
        'options' => [
            "min_range" => 1325358000,
            "max_range" => 1609354800,
        ]
    ];

    $isValidDate =
        filter_var($from, FILTER_VALIDATE_INT, $dateTimeValidateOptions) &&
        filter_var($to, FILTER_VALIDATE_INT, $dateTimeValidateOptions);

    $from = $isValidDate
        ? DateTime::createFromFormat('U', $from)
        : new DateTime('today');

    $to = $isValidDate
        ? DateTime::createFromFormat('U', $to)
        : new DateTime('tomorrow');

    $orders = new \Models\Orders($app);
    $res->json($orders->get($from, $to));
});

try {
    $klein->dispatch();
} catch (\Exception $e) {
    echo $e->getMessage();
}
