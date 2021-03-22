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

/** @namespace Component/CategoryConfigurableAttributes/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    currency_code: state.ConfigReducer.currencyData.current_currency_code,
    show_product_count: state.ConfigReducer.layered_navigation_product_count_enabled
});

/** @namespace Component/CategoryConfigurableAttributes/Container */
export class CategoryConfigurableAttributesContainer extends ProductConfigurableAttributesContainer {
    render() {
        return (
            <CategoryConfigurableAttributes
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

/** @namespace Component/CategoryConfigurableAttributes/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigurableAttributesContainer);
