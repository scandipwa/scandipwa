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

import Popup from 'Component/Popup';
import { orderType } from 'Type/Account';
import Loader from 'Component/Loader';

import './MyAccountOrderPopup.style';

export const ORDER_POPUP_ID = 'MyAccountOrderPopup';

class MyAccountOrderPopup extends PureComponent {
    static propTypes = {
        order: orderType.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const { order, isLoading } = this.props;

        return (
            <Popup
              id={ ORDER_POPUP_ID }
              mix={ { block: 'MyAccountOrderPopup' } }
            >
                { /* TODO: implement popup */ }
            </Popup>
        );
    }
}

export default MyAccountOrderPopup;
