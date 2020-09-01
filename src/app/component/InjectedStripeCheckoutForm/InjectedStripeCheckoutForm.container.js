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
import { injectStripe } from 'react-stripe-elements';

import { showNotification } from 'Store/Notification/Notification.action';

import InjectedStripeCheckoutForm from './InjectedStripeCheckoutForm.component';

export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export default connect(null, mapDispatchToProps)(injectStripe(InjectedStripeCheckoutForm));
