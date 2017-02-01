<?php
require_once __DIR__ . '/config.php';

use PHPRouter\RouteCollection;
use PHPRouter\Router;
use PHPRouter\Route;

try{
  session_start();
  $collection = new RouteCollection();
  $collection->attachRoute(new Route('/', array(
      '_controller' => 'IndexLayout::home',
      'methods' => 'GET'
  )));

  $collection->attachRoute(new Route('/init', array(
      '_controller' => 'IndexLayout::init',
      'methods' => 'POST'
  )));
  $collection->attachRoute(new Route('/next', array(
      '_controller' => 'IndexLayout::next',
      'methods' => 'POST'
  )));
  $collection->attachRoute(new Route('/prev', array(
      '_controller' => 'IndexLayout::prev',
      'methods' => 'POST'
  )));
  $collection->attachRoute(new Route('/getdata', array(
      '_controller' => 'IndexLayout::getIPData',
      'methods' => 'POST'
  )));


  $router = new Router($collection);
  $router->setBasePath(BASEROUTE);
  $route = $router->matchCurrentRequest();


}catch (Exception $ex) {
    fb($ex,__CLASS__.'::'.__FUNCTION__);
}
