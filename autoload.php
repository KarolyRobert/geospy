<?php

function class_autoloader($class) {
    if (file_exists(__DIR__.'/app/' . $class . '.php')) {
        require_once __DIR__.'/app/' . $class . '.php';
        return true;
    }
    return false;
}

spl_autoload_register('class_autoloader');
