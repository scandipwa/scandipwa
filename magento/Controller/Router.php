<?php
/**
 * @category  ScandiPWA
 * @package   ScandiPWA\Source
 * @author    Ilja Lapkovskis <info@scandiweb.com / ilja@scandiweb.com>
 * @copyright Copyright (c) 2019 Scandiweb, Ltd (http://scandiweb.com)
 * @license   OSL-3.0
 */

namespace ScandiPWA\Source\Controller;

use Magento\Framework\App\ActionFactory;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\RouterInterface;
use Magento\Framework\ObjectManagerInterface;
use ScandiPWA\Source\Controller\Category\Index;

class Router implements RouterInterface
{
    /**
     * @var ActionFactory
     */
    protected $actionFactory;

    /**
     * @var ObjectManagerInterface
     */
    protected $om;

    /**
     * @var array
     */
    protected $paths;
    /**
     * Router constructor.
     *
     * @param ActionFactory $actionFactory
     */
    public function __construct(
        ActionFactory $actionFactory,
        ObjectManagerInterface $om,
        $paths = [
            '/category',
            '/product',
            '/page',
            '/cart'
        ]
    ) {
        $this->actionFactory = $actionFactory;
        $this->om = $om;
        $this->paths = $paths;
    }

    /**
     * @param RequestInterface $request
     * @return \Magento\Framework\App\ActionInterface
     */
    public function match(RequestInterface $request)
    {
        $path = $request->getUri()->getPath();
        $actionInstance = null;
        $pathsIncludesRoot = $this->paths;
        $pathsIncludesRoot[]  = '/';
        if (in_array($path, $pathsIncludesRoot)) {
            $actionInstance = $this->om->get(Index::class);
        } else {
            foreach ($this->paths as $definedPath) {
                $res = preg_match('|^'.$definedPath.'|', $path);
                if ($res) {
                    $actionInstance = $this->om->get(Index::class);
                }
            }
        }


        return $actionInstance;
//        return $this->actionFactory->create(Index::class);
    }
}
