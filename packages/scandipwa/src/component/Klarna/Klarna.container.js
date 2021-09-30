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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification/Notification.action';

import KlarnaComponent from './Klarna.component';

/** @namespace Component/Klarna/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/Klarna/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/Klarna/Container */
export class KlarnaContainer extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired
    };

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

    containerProps() {
        const { showError, setOrderButtonEnableStatus } = this.props;

        return { showError, setOrderButtonEnableStatus };
    }

    render() {
        return <KlarnaComponent { ...this.containerProps() } />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlarnaContainer);
