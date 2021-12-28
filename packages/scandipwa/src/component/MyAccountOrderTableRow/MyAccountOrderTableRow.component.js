/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-tdeme
 * @link https://gitdub.com/scandipwa/base-tdeme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { OrderType } from 'Type/Order.type';
import { formatPrice } from 'Util/Price';

import './MyAccountOrderTableRow.style';

/** @namespace Component/MyAccountOrderTableRow/Component */
export class MyAccountOrderTableRow extends PureComponent {
    static propTypes = {
        order: OrderType.isRequired,
        onViewClick: PropTypes.func.isRequired
    };

    render() {
        const {
            order: {
                created_at,
                status,
                increment_id,
                total: {
                    grand_total: {
                        value,
                        currency
                    } = {}
                } = {}
            },
            onViewClick
        } = this.props;

        return (
            <tr onClick={ onViewClick } block="MyAccountOrderTableRow">
                <td>{ increment_id ? `#${increment_id}` : '' }</td>
                <td>{ created_at }</td>
                <td>{ status }</td>
                <td block="hidden-mobile">
                    { value ? formatPrice(value, currency) : '' }
                </td>
            </tr>
        );
    }
}

export default MyAccountOrderTableRow;
