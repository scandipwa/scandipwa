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
import CheckoutPage from './CheckoutPage.component';

const mapStateToProps = state => ({
    products: state.CartReducer.products,
    totals: state.CartReducer.totals
});

const mapDispatchToProps = dispatch => ({
});

const CheckoutPageContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);

export default CheckoutPageContainer;
