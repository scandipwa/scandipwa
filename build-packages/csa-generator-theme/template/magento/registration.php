<?php

use \Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::THEME,
    'frontend/scandipwa/<%= name %>',
    __DIR__
);