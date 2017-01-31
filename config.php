<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/autoload.php';
require_once __DIR__ . '/location.php';

define("DEBUG", true);

define("BASEROUTE",'/');

DB::$encoding = "utf8";
DB::$error_handler = false;
DB::$throw_exception_on_error = true;
DB::$nonsql_error_handler = 'my_db_error_handler';

function my_db_error_handler($params) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 510);
    echo "Database error. Please try again later!<br>\n";
    die();
}

header('Content-type: text/html; charset=utf-8');

if (DEBUG) {
    ob_start();
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(-1);
    $firephp = FirePHP::getInstance(true);
    $firephp->registerErrorHandler($throwErrorExceptions = false);
    $firephp->registerExceptionHandler();
    $firephp->registerAssertionHandler($convertAssertionErrorsToExceptions = true, $throwAssertionExceptions = false);
} else {
    if (!function_exists('fb')) {
        function fb() {
        }
    }
}
