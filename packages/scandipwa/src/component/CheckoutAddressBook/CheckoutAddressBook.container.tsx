/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { CustomerAddress } from 'Query/MyAccount.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';
import { RootState } from 'Util/Store/Store.type';

import CheckoutAddressBook from './CheckoutAddressBook.component';
import {
    CheckoutAddressBookComponentProps,
    CheckoutAddressBookContainerMapDispatchProps,
    CheckoutAddressBookContainerMapStateProps,
    CheckoutAddressBookContainerProps,
    CheckoutAddressBookContainerPropsKeys,
    CheckoutAddressBookContainerState,
} from './CheckoutAddressBook.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/CheckoutAddressBook/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutAddressBookContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer,
});

/** @namespace Component/CheckoutAddressBook/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CheckoutAddressBookContainerMapDispatchProps => ({
    requestCustomerData: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(),
    ),
});

/** @namespace Component/CheckoutAddressBook/Container */
export class CheckoutAddressBookContainer extends PureComponent<
CheckoutAddressBookContainerProps,
CheckoutAddressBookContainerState
> {
    static defaultProps: Partial<CheckoutAddressBookContainerProps> = {
        isBilling: false,
        onAddressSelect: noopFn,
        onShippingEstimationFieldsChange: noopFn,
        is_virtual: false,
    };

    static _getDefaultAddressId(props: CheckoutAddressBookContainerProps): number {
        const { customer, isBilling } = props;
        const defaultKey = isBilling ? 'default_billing' : 'default_shipping';
        const { [ defaultKey ]: defaultAddressId, addresses } = customer;

        if (defaultAddressId) {
            return +defaultAddressId;
        }

        if (addresses && addresses.length) {
            return addresses[ 0 ].id;
        }

        return 0;
    }

    containerFunctions = ({
        onAddressSelect: this.onAddressSelect.bind(this),
    });

    __construct(props: CheckoutAddressBookContainerProps): void {
        super.__construct?.(props);

        const {
            requestCustomerData,
            customer,
            onAddressSelect,
        } = props;

        if (isSignedIn() && !Object.keys(customer).length) {
            requestCustomerData();
        }

        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        if (defaultAddressId) {
            onAddressSelect(defaultAddressId);
            this.estimateShipping(defaultAddressId);
        }

        this.state = {
            prevDefaultAddressId: defaultAddressId,
            selectedAddressId: defaultAddressId,
        };
    }

    static getDerivedStateFromProps(
        props: CheckoutAddressBookContainerProps,
        state: CheckoutAddressBookContainerState,
    ): null | CheckoutAddressBookContainerState {
        const { prevDefaultAddressId } = state;
        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        if (defaultAddressId !== prevDefaultAddressId) {
            return {
                selectedAddressId: defaultAddressId,
                prevDefaultAddressId: defaultAddressId,
            };
        }

        return null;
    }

    componentDidUpdate(_: CheckoutAddressBookContainerProps, prevState: CheckoutAddressBookContainerState): void {
        const {
            onAddressSelect,
            requestCustomerData,
            customer,
        } = this.props;
        const { selectedAddressId: prevSelectedAddressId } = prevState;
        const { selectedAddressId } = this.state;

        if (isSignedIn() && !Object.keys(customer).length) {
            requestCustomerData();
        }

        if (selectedAddressId !== prevSelectedAddressId) {
            onAddressSelect(selectedAddressId);
            this.estimateShipping(selectedAddressId);
        }
    }

    containerProps(): Pick<CheckoutAddressBookComponentProps, CheckoutAddressBookContainerPropsKeys> {
        const {
            customer,
            onShippingEstimationFieldsChange,
            isBilling,
            is_virtual,
        } = this.props;
        const { selectedAddressId } = this.state;

        return {
            customer,
            onShippingEstimationFieldsChange,
            isBilling,
            selectedAddressId,
            is_virtual,
        };
    }

    onAddressSelect(address?: CustomerAddress): void {
        const { id = 0 } = address || {};

        this.setState({ selectedAddressId: id });
    }

    estimateShipping(addressId: number): void {
        const {
            onShippingEstimationFieldsChange,
            customer: { addresses = [] },
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
                region,
            } = {},
        } = address;

        if (!country_id) {
            return;
        }

        onShippingEstimationFieldsChange({
            city,
            country_id,
            region_id,
            region,
            postcode,
        });
    }

    render(): ReactElement {
        return (
            <CheckoutAddressBook
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressBookContainer);
