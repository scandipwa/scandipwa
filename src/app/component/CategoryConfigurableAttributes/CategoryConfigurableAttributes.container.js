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

// eslint-disable-next-line max-len
import ProductConfigurableAttributesContainer from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';
import CategoryConfigurableAttributes from './CategoryConfigurableAttributes.component';

class CategoryConfigurableAttributesContainer extends ProductConfigurableAttributesContainer {
    render() {
        return (
            <CategoryConfigurableAttributes
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default CategoryConfigurableAttributesContainer;
