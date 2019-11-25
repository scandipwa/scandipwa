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
import PropTypes from 'prop-types';
import KlarnaComponent from './Klarna.component';

export class KlarnaContainer extends PureComponent {
    static propTypes = {

    };

    static sendAuthorizeRequest() {
        return new Promise((resolve, reject) => {
            Klarna.Payments.authorize(
                { payment_method_category: 'pay_later' },
                {},
                (res) => {
                    const { error, approved, authorization_token } = res;
                    if (!approved) reject(error);

                    resolve({ authorization_token });
                }
            );
        });
    }

    static authorize() {
        return KlarnaContainer.sendAuthorizeRequest();
    }

    render() {
        return <KlarnaComponent />;
    }
}

export default KlarnaContainer;
