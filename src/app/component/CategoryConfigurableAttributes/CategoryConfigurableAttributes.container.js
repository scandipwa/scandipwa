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

import { connect } from 'react-redux';

// eslint-disable-next-line max-len
import ProductConfigurableAttributesContainer from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';

import CategoryConfigurableAttributes from './CategoryConfigurableAttributes.component';

export const mapStateToProps = (state) => ({
    currency_code: state.ConfigReducer.default_display_currency_code
});

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

export default connect(mapStateToProps)(CategoryConfigurableAttributesContainer);
