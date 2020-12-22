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

import { customerType } from 'Type/Account';

import CheckoutAddressBook from './CheckoutAddressBook.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/CheckoutAddressBook/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Component/CheckoutAddressBook/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    requestCustomerData: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(dispatch)
    )
});

/** @namespace Component/CheckoutAddressBook/Container */
export class CheckoutAddressBookContainer extends PureComponent {
    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func,
        onAddressSelect: PropTypes.func,
        customer: customerType.isRequired,
        isBilling: PropTypes.bool
    };

    static defaultProps = {
        isBilling: false,
        onAddressSelect: () => {},
        onShippingEstimationFieldsChange: () => {}
    };

    static _getDefaultAddressId(props) {
        const { customer, isBilling } = props;
        const defaultKey = isBilling ? 'default_billing' : 'default_shipping';
        const { [defaultKey]: defaultAddressId, addresses } = customer;

        if (defaultAddressId) {
            return +defaultAddressId;
        }
        if (addresses && addresses.length) {
            return addresses[0].id;
        }

        return 0;
    }

    containerFunctions = ({
        onAddressSelect: this.onAddressSelect.bind(this)
    });

    __construct(props) {
        super.__construct(props);

        const {
            requestCustomerData,
            customer,
            onAddressSelect,
            isSignedIn
        } = props;

        if (isSignedIn && !Object.keys(customer).length) {
            requestCustomerData();
        }

        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        if (defaultAddressId) {
            onAddressSelect(defaultAddressId);
            this.estimateShipping(defaultAddressId);
        }

        this.state = {
            prevDefaultAddressId: defaultAddressId,
            selectedAddressId: defaultAddressId
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { prevDefaultAddressId } = state;
        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        if (defaultAddressId !== prevDefaultAddressId) {
            return {
                selectedAddressId: defaultAddressId,
                prevDefaultAddressId: defaultAddressId
            };
        }

        return null;
    }

    componentDidUpdate(_, prevState) {
        const {
            onAddressSelect,
            requestCustomerData,
            isSignedIn,
            customer
        } = this.props;
        const { selectedAddressId: prevSelectedAddressId } = prevState;
        const { selectedAddressId } = this.state;

        if (isSignedIn && !Object.keys(customer).length) {
            requestCustomerData();
        }

        if (selectedAddressId !== prevSelectedAddressId) {
            onAddressSelect(selectedAddressId);
            this.estimateShipping(selectedAddressId);
        }
    }

    onAddressSelect(address) {
        const { id = 0 } = address;
        this.setState({ selectedAddressId: id });
    }

    estimateShipping(addressId) {
        const {
            onShippingEstimationFieldsChange,
            customer: { addresses = [] }
        } = this.props;

        const address = addresses.find(({ id }) => id === addressId);

        if (!address) {
            return;
        }

        const {
            city,
            country_id,
            postcode,
            region: {
                region_id,
                region
            } = {}
        } = address;

        if (!country_id) {
            return;
        }

        onShippingEstimationFieldsChange({
            city,
            country_id,
            region_id,
            region,
            postcode
        });
    }

    render() {
        return (
            <CheckoutAddressBook
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressBookContainer);
