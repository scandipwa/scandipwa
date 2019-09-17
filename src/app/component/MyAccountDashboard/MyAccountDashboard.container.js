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
import { connect } from 'react-redux';
import { customerType } from 'Type/Account';
import MyAccountDashboard from './MyAccountDashboard.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

export const mapDispatchToProps = dispatch => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class MyAccountDashboardContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired
    };

    containerFunctions = {
        getDefaultAddress: this.getDefaultAddress.bind(this)
    };

    getDefaultAddress(isBilling) {
        const { customer: { addresses = [] } } = this.props;
        const key = isBilling ? 'default_billing' : 'default_shipping';
        return addresses.find(({ [key]: defaultAddress }) => defaultAddress);
    }

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };


    render() {
        return (
            <MyAccountDashboard
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDashboardContainer);
