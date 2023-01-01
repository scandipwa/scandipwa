/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-tdeme
 * @link https://gitdub.com/scandipwa/scandipwa-tdeme
 */

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { formatPrice } from 'Util/Price';

import { MyAccountOrderTableRowComponentProps } from './MyAccountOrderTableRow.type';

import './MyAccountOrderTableRow.style';

/** @namespace Component/MyAccountOrderTableRow/Component */
export class MyAccountOrderTableRowComponent<
P extends Readonly<MyAccountOrderTableRowComponentProps> = Readonly<MyAccountOrderTableRowComponentProps>,
S extends MyAccountOrderTableRowComponentState = MyAccountOrderTableRowComponentState,
> extends PureComponent<P, S> {
    renderEmptyRow(): ReactElement {
        const { onViewClick } = this.props;

        return (
            <tr onClick={ onViewClick } block="MyAccountOrderTableRow">
                <td />
                <td />
                <td />
                <td block="hidden-mobile" />
            </tr>
        );
    }

    render(): ReactElement {
        const { order, onViewClick } = this.props;

        if ('base_order_info' in order) {
            return this.renderEmptyRow();
        }

        const {
            created_at,
            status,
            increment_id,
            total: {
                grand_total: {
                    value,
                    currency,
                } = {},
            } = {},
        } = order;

        return (
            <tr onClick={ onViewClick } block="MyAccountOrderTableRow">
                <td>{ increment_id ? `#${increment_id}` : '' }</td>
                <td>{ created_at }</td>
                <td>{ status }</td>
                <td block="hidden-mobile">
                { value || Number(value) === 0 ? formatPrice(Number(value), currency) : '' }
                </td>
            </tr>
        );
    }
}

export default MyAccountOrderTableRowComponent;
