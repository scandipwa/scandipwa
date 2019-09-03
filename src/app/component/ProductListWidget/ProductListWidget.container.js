/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { CategoryProductListContainer as SourceCategoryProductListContainer } from 'Component/CategoryProductList/CategoryProductList.container';
import TestWidget from 'Component/TestWidget';

export class ProductListWidgetContainer extends SourceCategoryProductListContainer {

    render() {
        return <TestWidget />;
    }

}

export default ProductListWidgetContainer;
