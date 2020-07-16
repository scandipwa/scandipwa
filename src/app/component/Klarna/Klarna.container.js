/* eslint-disable no-undef */
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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification/Notification.action';

import KlarnaComponent from './Klarna.component';

export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

export class KlarnaContainer extends PureComponent {
    static authorize() {
        return new Promise((resolve, reject) => {
            Klarna.Payments.authorize(
                { payment_method_category: 'pay_later' },
                {},
                (res) => {
                    const { error, approved, authorization_token } = res;
                    if (!approved) {
                        reject(error);
                    }

                    resolve({ authorization_token });
                }
            );
        });
    }

    render() {
        return <KlarnaComponent { ...this.props } />;
    }
}

export default connect(null, mapDispatchToProps)(KlarnaContainer);
