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

import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountAddressFormContainer,
} from 'Component/MyAccountAddressForm/MyAccountAddressForm.container';
import { ReactElement } from 'Type/Common.type';

import CheckoutAddressForm from './CheckoutAddressForm.component';
import {
    CheckoutAddressFormComponentProps,
    CheckoutAddressFormContainerProps,
    CheckoutAddressFormContainerPropsKeys,
    CheckoutAddressFormContainerState,
} from './CheckoutAddressForm.type';

/** @namespace Component/CheckoutAddressForm/Container */
export class CheckoutAddressFormContainer<
P extends Readonly<CheckoutAddressFormContainerProps> = Readonly<CheckoutAddressFormContainerProps>,
S extends CheckoutAddressFormContainerState = CheckoutAddressFormContainerState,
> extends MyAccountAddressFormContainer<P, S> {
    static defaultProps = {
        ...MyAccountAddressFormContainer.defaultProps,
    };

    containerProps(): Pick<CheckoutAddressFormComponentProps, CheckoutAddressFormContainerPropsKeys> {
        const { onShippingEstimationFieldsChange } = this.props;

        return {
            onShippingEstimationFieldsChange,
            ...super.containerProps(),
        };
    }

    render(): ReactElement {
        return (
            <CheckoutAddressForm
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressFormContainer);
