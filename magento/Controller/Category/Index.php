<?php
/**
 * @category  ScandiPWA
 * @package   ScandiPWA\Source
 * @author    Ilja Lapkovskis <info@scandiweb.com / ilja@scandiweb.com>
 * @copyright Copyright (c) 2019 Scandiweb, Ltd (http://scandiweb.com)
 * @license   OSL-3.0
 */

namespace ScandiPWA\Source\Controller\Category;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\View\Result\PageFactory;
use Magento\Catalog\Model\ResourceModel\Category\Collection as CategoryResourceCollection;
use Magento\Catalog\Model\ProductFactory;
use Magento\Cms\Model\GetPageByIdentifier;
use Magento\Framework\ObjectManagerInterface;
use Magento\Framework\Exception\NoSuchEntityException;

class Index extends Action implements HttpGetActionInterface, HttpPostActionInterface
{
    const CATEGORY_BASE_PATH = '/category/';
    const PRODUCT_BASE_PATH = '/product/';
    const CMS_PAGE_BASE_PATH = '/page/';
    /**
     * @var
     */
    private $resultPageFactory;
    protected $categoryResourceCollection;
    protected $productFactory;

    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        CategoryResourceCollection $categoryResourceCollection,
        ProductFactory $productFactory,
        ObjectManagerInterface $om
    ) {
        $this->resultPageFactory = $resultPageFactory;
        $this->categoryResourceCollection = $categoryResourceCollection;
        $this->productFactory = $productFactory;
        $this->om = $om;
        parent::__construct($context);
    }

    public function execute()
    {
        $resultLayout = $this->resultPageFactory->create();
        $resultLayout->setStatusHeader(200, '1.1', 'OK');
        $resultLayout->setHeader('X-Status', 'OK');
        return $resultLayout;
    }

    public function validateCategory(RequestInterface $request) {
        $path = $request->getUri()->getPath();

        $url_path = str_replace(self::CATEGORY_BASE_PATH,'', $path);

        $categoryId = $this->categoryResourceCollection->addAttributeToFilter('url_path', $url_path)
            ->addAttributeToSelect(['entity_id'])->getFirstItem()->getEntityId();

        if ($categoryId) {
            return true;
        }

        return false;
    }

    public function validateProduct(RequestInterface $request) {
        $path = $request->getUri()->getPath();

        $url_key = str_replace(self::PRODUCT_BASE_PATH,'', $path);

        $product = $this->productFactory->create();

        /**
         * @var $productCollection \Magento\Catalog\Model\ResourceModel\Product\Collection
         */
        $productCollection = $product->getCollection();
        $productCollection->addAttributeToFilter('url_key', $url_key);
        $ids = $productCollection->getAllIds();
        $productId = reset($ids);

        if ($productId) {
            return true;
        }

        return false;
    }

    public function validateCmsPage(RequestInterface $request) {
        $path = $request->getUri()->getPath();

        $cms_page_identifier = str_replace(self::CMS_PAGE_BASE_PATH,'', $path);

        try {
             $this->om->get(GetPageByIdentifier::class)->execute($cms_page_identifier, 0);
        } catch(NoSuchEntityException $e) {
            return false;
        }

        return true;
    }
}
