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
import { RelatedProductsDispatcher } from 'Store/RelatedProducts';
import RelatedProducts from './RelatedProducts.component';

export const mapStateToProps = state => ({
    relatedProducts: state.RelatedProductsReducer.relatedProducts
});

export const mapDispatchToProps = dispatch => ({
    clearRelatedProducts: () => {
        RelatedProductsDispatcher.clearRelatedProducts(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedProducts);
