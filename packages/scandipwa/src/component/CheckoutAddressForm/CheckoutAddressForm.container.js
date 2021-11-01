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

import { connect } from 'react-redux';

import {
    mapStateToProps as sourceMapStateToProps,
    MyAccountAddressFormContainer
} from 'Component/MyAccountAddressForm/MyAccountAddressForm.container';

import CheckoutAddressForm from './CheckoutAddressForm.component';

/** @namespace Component/CheckoutAddressForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    shippingFields: state.CheckoutReducer.shippingFields
});

/** @namespace Component/CheckoutAddressForm/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CheckoutAddressForm/Container */
export class CheckoutAddressFormContainer extends MyAccountAddressFormContainer {
    containerProps() {
        const { shippingFields, onShippingEstimationFieldsChange } = this.props;

        return {
            shippingFields,
            onShippingEstimationFieldsChange,
            ...super.containerProps()
        };
    }

    render() {
        return (
            <CheckoutAddressForm
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressFormContainer);
