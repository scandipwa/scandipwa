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
import CheckoutDeliveryOption from './CheckoutDeliveryOption.component';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals
});

// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(
    middleware(mapStateToProps, 'Component/CheckoutDeliveryOption/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/CheckoutDeliveryOption/Container/mapDispatchToProps')
)(CheckoutDeliveryOption);
