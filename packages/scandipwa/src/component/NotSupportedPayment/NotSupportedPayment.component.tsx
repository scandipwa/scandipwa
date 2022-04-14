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

import { ReactElement } from 'Type/Common.type';

import './NotSupportedPayment.style';

/** @namespace Component/NotSupportedPayment/Component */
export class NotSupportedPayment extends PureComponent {
    static propTypes = {
        disableButton: PropTypes.func.isRequired
    };

    componentDidMount(): void {
        const { disableButton } = this.props;
        disableButton();
    }

    render(): ReactElement {
        return (
            <div block="NotSupportedPayment">
                <p>{ __('This payment method is not supported yet.') }</p>
            </div>
        );
    }
}

export default NotSupportedPayment;
