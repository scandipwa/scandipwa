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

/** @namespace Component/Klarna/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/Klarna/Container */
export class KlarnaContainer extends PureComponent {
    static authorize() {
        return new Promise((resolve, reject) => {
            window.Klarna.Payments.authorize(
                { payment_method_category: localStorage.getItem('kl_pm') },
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

/** @namespace Component/Klarna/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(KlarnaContainer);
