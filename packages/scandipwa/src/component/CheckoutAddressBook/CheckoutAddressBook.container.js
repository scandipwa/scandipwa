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

import { Addresstype, CustomerType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';

import CheckoutAddressBook from './CheckoutAddressBook.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/CheckoutAddressBook/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    shippingFields: state.CheckoutReducer.shippingFields
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
        requestCustomerData: PropTypes.func.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func,
        onAddressSelect: PropTypes.func,
        customer: CustomerType.isRequired,
        isBilling: PropTypes.bool,
        isSubmitted: PropTypes.bool,
        is_virtual: PropTypes.bool,
        shippingFields: Addresstype
    };

    static defaultProps = {
        isBilling: false,
        onAddressSelect: noopFn,
        onShippingEstimationFieldsChange: noopFn,
        isSubmitted: false,
        is_virtual: false,
        shippingFields: {}
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
            onAddressSelect
        } = props;

        if (isSignedIn() && !Object.keys(customer).length) {
            requestCustomerData();
        }

        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        const selectedAddressId = this.getSelectedAddressId(defaultAddressId);

        if (selectedAddressId) {
            onAddressSelect(selectedAddressId);
            this.estimateShipping(selectedAddressId);
        }

        this.state = {
            prevDefaultAddressId: defaultAddressId,
            selectedAddressId
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { prevDefaultAddressId } = state;
        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        if (defaultAddressId !== prevDefaultAddressId) {
            return {
                selectedAddressId: this?.getSelectedAddressId(defaultAddressId) || defaultAddressId,
                prevDefaultAddressId: defaultAddressId
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            onAddressSelect,
            requestCustomerData,
            customer,
            shippingFields: {
                street: shippingFieldsStreet = []
            }
        } = this.props;
        const {
            shippingFields: {
                street: prevShippingFieldsStreet = []
            }
        } = prevProps;
        const { selectedAddressId: prevSelectedAddressId } = prevState;
        const { selectedAddressId, prevDefaultAddressId } = this.state;

        if (isSignedIn() && !Object.keys(customer).length) {
            requestCustomerData();
        }

        if (shippingFieldsStreet.length && !prevShippingFieldsStreet.length) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ selectedAddressId: this.getSelectedAddressId(prevDefaultAddressId) });
        }

        if (selectedAddressId !== prevSelectedAddressId) {
            onAddressSelect(selectedAddressId);
            this.estimateShipping(selectedAddressId);
        }
    }

    containerProps() {
        const {
            customer,
            onShippingEstimationFieldsChange,
            isBilling,
            isSubmitted,
            shippingFields
        } = this.props;
        const { selectedAddressId } = this.state;

        return {
            customer,
            onShippingEstimationFieldsChange,
            isBilling,
            selectedAddressId,
            isSubmitted,
            shippingFields
        };
    }

    getAddressIdFromAddressBook() {
        const {
            shippingFields,
            customer: {
                addresses = []
            } = {}
        } = this.props;

        // the main keys distinguishing addresses
        const keys = [
            'city',
            'country_id',
            'firstname',
            'lastname',
            'postcode',
            'telephone',
            'vat_id'
        ];

        const filteredAddresses = (
            addresses.filter((address) => (
                keys.every((key) => {
                    if (shippingFields[key] !== address[key]) {
                        return false;
                    }

                    return true;
                })
                && (
                    JSON.stringify(shippingFields.street) === JSON.stringify(address.street)
                )
            ))
        );

        return filteredAddresses.length ? filteredAddresses[0].id : 0;
    }

    getSelectedAddressId(defaultAddressId) {
        const {
            shippingFields: {
                id: shippingFieldsId = 0,
                street: shippingFieldsStreet = []
            },
            isBilling
        } = this.props;

        if (isBilling) {
            return defaultAddressId;
        }

        if (shippingFieldsId) {
            return shippingFieldsId;
        }

        if (!shippingFieldsStreet.length) {
            return defaultAddressId;
        }

        // comparing address values to check if the fetched address is in the address book
        const addressId = this.getAddressIdFromAddressBook();

        return addressId;
    }

    onAddressSelect(address) {
        const { id = 0 } = address;
        this.setState({ selectedAddressId: id });
    }

    estimateShipping(addressId) {
        const {
            onShippingEstimationFieldsChange,
            customer: { addresses = [] },
            shippingFields,
            shippingFields: {
                street: shippingFieldsStreet = []
            },
            isBilling
        } = this.props;

        const address = (
            !addressId && !isBilling
                ? shippingFields
                : addresses.find(({ id }) => id === addressId)
        );

        if (!address || (!isBilling && !addressId && !shippingFieldsStreet.length)) {
            return;
        }

        const {
            city,
            country_id,
            postcode,
            region: {
                region_id,
                region
            } = {},
            region_string,
            region: address_region,
            region_id: regionId
        } = address;

        if (!country_id) {
            return;
        }

        onShippingEstimationFieldsChange({
            city,
            country_id,
            region_id: region_id || regionId,
            region: region_string || region || address_region,
            postcode
        });
    }

    render() {
        return (
            <CheckoutAddressBook
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressBookContainer);
