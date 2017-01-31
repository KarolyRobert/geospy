<?php
require_once __DIR__ . '/config.php';

use PHPRouter\RouteCollection;
use PHPRouter\Router;
use PHPRouter\Route;

try{
  //fb("firebug próba","sikeres");
  $collection = new RouteCollection();
  $collection->attachRoute(new Route('/', array(
      '_controller' => 'IndexLayout::home',
      'methods' => 'GET'
  )));

  $router = new Router($collection);
  $router->setBasePath(BASEROUTE);
  $route = $router->matchCurrentRequest();


}catch (Exception $ex) {
    fb($ex,__CLASS__.'::'.__FUNCTION__);
}
