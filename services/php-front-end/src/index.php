<?php 
require __DIR__ . '/vendor/autoload.php';

$log = new Monolog\Logger('OSPREY-CRITIQUE');
$log->pushHandler(new \Monolog\Handler\ErrorLogHandler());
$log->info('Starting up');

$loader = new Twig_Loader_Filesystem('./templates');
$twig = new Twig_Environment($loader, array(
    'cache' => './_twigcache',
));

$template = $twig->load('index.twig');
echo $template->render(array('the' => 'variables', 'go' => 'here'));


