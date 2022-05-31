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

import CheckoutAddressForm from 'Component/CheckoutAddressForm';
import CheckoutAddressTable from 'Component/CheckoutAddressTable';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { CustomerAddress } from 'Query/MyAccount.type';
import { CheckoutSteps } from 'Route/Checkout/Checkout.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { MyAccountTabs } from 'Type/Account.type';
import { ReactElement } from 'Type/Common.type';
import { getDefaultAddressLabel } from 'Util/Address';
import { isSignedIn } from 'Util/Auth';

import { CheckoutAddressBookComponentProps, CheckoutAddressBookComponentState } from './CheckoutAddressBook.type';

import './CheckoutAddressBook.style';

/** @namespace Component/CheckoutAddressBook/Component */
export class CheckoutAddressBook extends PureComponent<
CheckoutAddressBookComponentProps,
CheckoutAddressBookComponentState
> {
    state = {
        isCustomAddressExpanded: false
    };

    __construct(props: CheckoutAddressBookComponentProps): void {
        super.__construct?.(props);

        this.renderAddress = this.renderAddress.bind(this);
        this.expandCustomAddress = this.expandCustomAddress.bind(this);
    }

    static getDerivedStateFromProps(
        props: CheckoutAddressBookComponentProps
    ): CheckoutAddressBookComponentState | null {
        const { is_virtual, selectedAddressId, customer: { addresses = [] } } = props;

        if (addresses.length === 0) {
            return { isCustomAddressExpanded: true };
        }

        if (selectedAddressId === 0) {
            return is_virtual ? { isCustomAddressExpanded: true } : null;
        }

        return { isCustomAddressExpanded: false };
    }

    expandCustomAddress(): void {
        const { onAddressSelect } = this.props;
        this.setState({ isCustomAddressExpanded: true });
        onAddressSelect();
    }

    renderNoAddresses(): ReactElement {
        return (
            <div>
                <p>{ __('You have no configured addresses.') }</p>
                <p>
                    <Link to={ `${ AccountPageUrl.ACCOUNT_URL }/${ MyAccountTabs.ADDRESS_BOOK }` }>
                        { __('Go to Address Book to configure them!') }
                    </Link>
                </p>
            </div>
        );
    }

    renderLoading(): ReactElement {
        return (
            <Loader isLoading />
        );
    }

    renderAddress(address: CustomerAddress, index: number): ReactElement {
        const { onAddressSelect, selectedAddressId } = this.props;
        const addressNumber = index + 1;
        const { id } = address;
        const postfix = getDefaultAddressLabel(address);

        return (
            <CheckoutAddressTable
              onClick={ onAddressSelect }
              isSelected={ selectedAddressId === id }
              title={ __('Address #%s%s', addressNumber, postfix) }
              address={ address }
              key={ id }
            />
        );
    }

    renderAddressList(): ReactElement {
        const { customer: { addresses } } = this.props;

        if (!addresses) {
            return this.renderLoading();
        }

        if (!addresses.length) {
            return this.renderNoAddresses();
        }

        return addresses.map(this.renderAddress);
    }

    renderHeading(): ReactElement {
        const { isBilling } = this.props;

        if (isBilling) {
            return null;
        }

        return (
            <h2 block="Checkout" elem="Heading">
                { __('Shipping address') }
            </h2>
        );
    }

    renderCustomAddress(): ReactElement {
        const { isBilling, onShippingEstimationFieldsChange, isSubmitted } = this.props;
        const formPortalId = isBilling ? CheckoutSteps.BILLING_STEP : CheckoutSteps.SHIPPING_STEP;

        return (
            <CheckoutAddressForm
              onShippingEstimationFieldsChange={ onShippingEstimationFieldsChange }
              id={ formPortalId }
              isSubmitted={ isSubmitted }
            />
        );
    }

    renderOptionalCustomAddress(): ReactElement {
        const { isCustomAddressExpanded } = this.state;

        return (
            <div
              block="CheckoutAddressBook"
              elem="CustomAddressWrapper"
            >
                <button
                  block="CheckoutAddressBook"
                  elem="Button"
                  mods={ { isCustomAddressExpanded } }
                  mix={ { block: 'Button', mods: { isHollow: true } } }
                  type="button"
                  onClick={ this.expandCustomAddress }
                >
                    { __('Use custom address') }
                </button>
                { isCustomAddressExpanded && this.renderCustomAddress() }
            </div>
        );
    }

    renderSignedInContent(): ReactElement {
        return (
            <>
                <div block="CheckoutAddressBook" elem="Wrapper">
                    { this.renderAddressList() }
                </div>
                { this.renderOptionalCustomAddress() }
            </>
        );
    }

    renderGuestContent(): ReactElement {
        return this.renderCustomAddress();
    }

    renderContent(): ReactElement {
        if (isSignedIn()) {
            return this.renderSignedInContent();
        }

        return this.renderGuestContent();
    }

    render(): ReactElement {
        return (
            <div block="CheckoutAddressBook">
                { this.renderHeading() }
                { this.renderContent() }
            </div>
        );
    }
}

export default CheckoutAddressBook;
