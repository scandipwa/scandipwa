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

import { ACCOUNT_ORDER_URL } from 'Route/MyAccount/MyAccount.config';
import { OrderType } from 'Type/Order.type';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountOrderTableRow from './MyAccountOrderTableRow.component';

/** @namespace Component/MyAccountOrderTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({
});

/** @namespace Component/MyAccountOrderTableRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountOrderTableRow/Container */
export class MyAccountOrderTableRowContainer extends PureComponent {
    static propTypes = {
        order: OrderType.isRequired,
        display_tax_in_shipping_amount: PropTypes.string
    };

    static defaultProps = {
        display_tax_in_shipping_amount: ''
    };

    containerFunctions = {
        onViewClick: this.onViewClick.bind(this)
    };

    onViewClick() {
        const { order: { id } } = this.props;

        history.push({ pathname: appendWithStoreCode(`${ACCOUNT_ORDER_URL}/${id}`) });
    }

    containerProps() {
        const {
            display_tax_in_shipping_amount,
            order
        } = this.props;

        return {
            display_tax_in_shipping_amount,
            order
        };
    }

    render() {
        return (
            <MyAccountOrderTableRow
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer);
