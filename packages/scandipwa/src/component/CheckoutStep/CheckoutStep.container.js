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

import { showNotification } from 'Store/Notification/Notification.action';

import CheckoutStep from './CheckoutStep.component';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/CheckoutShipping/Component */
export class CheckoutStepContainer extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired
    };

    state = {
        selectedCustomerAddress: null
    };

    containerFunctions = {
        setAddress: this.setAddress.bind(this),
        onError: this.onError.bind(this)
    };

    setAddress(address) {
        this.setState({ selectedCustomerAddress: address });
    }

    onError() {
        const { showError } = this.props;
        showError(__('Fix form issues!'));
    }

    onSubmit() {
        // Sets email

        // Sets address
        const { selectedCustomerAddress } = this.state;
        console.log([selectedCustomerAddress]);
    }

    render() {
        return (
            <CheckoutStep
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutStepContainer);
