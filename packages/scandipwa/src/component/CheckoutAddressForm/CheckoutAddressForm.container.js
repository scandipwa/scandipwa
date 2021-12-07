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
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountAddressFormContainer
} from 'Component/MyAccountAddressForm/MyAccountAddressForm.container';

import CheckoutAddressForm from './CheckoutAddressForm.component';

/** @namespace Component/CheckoutAddressForm/Container */
export class CheckoutAddressFormContainer extends MyAccountAddressFormContainer {
    static propTypes = {
        ...super.propTypes,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired
    };

    containerProps() {
        const { onShippingEstimationFieldsChange } = this.props;

        return {
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
