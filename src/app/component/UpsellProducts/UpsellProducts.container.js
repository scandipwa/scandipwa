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
import UpsellProducts from './UpsellProducts.component';

export const mapStateToProps = state => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

export const UpsellProductsContainer = connect(mapStateToProps)(UpsellProducts);

export default UpsellProductsContainer;
