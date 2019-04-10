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
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import CheckoutPage from './CheckoutPage.component';

const mapStateToProps = state => ({
    products: state.CartReducer.products,
    totals: state.CartReducer.totals,
    toggleHeaderAndFooter: state.HeaderAndFooterReducer.toggleHeaderAndFooter
});

const mapDispatchToProps = dispatch => ({
    updateToggleHeaderAndFooter: (options) => {
        HeaderAndFooterDispatcher.toggleHeaderAndFooter(dispatch, options);
    }
});

const CheckoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);

export default CheckoutPageContainer;
