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
use Magento\Framework\ObjectManager\ObjectManager;
use Magento\Framework\ObjectManagerInterface;
use ScandiPWA\Source\Controller\Category\Search;

class Router implements RouterInterface
{
    /**
     * @var ActionFactory
     */
    protected $actionFactory;

    /**
     * Router constructor.
     * @param ActionFactory $actionFactory
     */
    public function __construct(
        ActionFactory $actionFactory,
        ObjectManagerInterface $om
    )
    {
        $this->actionFactory = $actionFactory;
    }

    /**
     * @param RequestInterface $request
     * @return \Magento\Framework\App\ActionInterface
     */
    public function match(RequestInterface $request)
    {
        $t = 't';
//        $action = $this->om->get('pffff');
//        return $action;
//        return $this->actionFactory->create(Index::class);
    }
}
