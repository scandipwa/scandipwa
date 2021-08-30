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

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutGuestForm from 'Component/CheckoutGuestForm/CheckoutGuestForm.component';
import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import Form from 'Component/PureForm/Form';

/** @namespace Component/CheckoutShipping/Component */
export class CheckoutStep extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        onAddressUpdate: PropTypes.func.isRequired,
        setAddress: PropTypes.func.isRequired
    };

    className = this.constructor.name.slice(0, -1);

    actionLabel = '';

    renderLoginForm() {
        return (
            <CheckoutGuestForm />
        );
    }

    renderAddress() {
        // Renders address book
        const { onAddressUpdate, setAddress } = this.props;

        return (
            <CheckoutAddressBook
              onAddressUpdate={ onAddressUpdate }
              setAddress={ setAddress }
            />
        );
    }

    renderBody() {
        return null;
    }

    renderAction() {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mods={ { block: this.className, elem: 'Button' } }
            >
                { this.actionLabel }
            </button>
        );
    }

    render() {
        const { onError, onSubmit } = this.props;

        return (
            <Form
              block="CheckoutShipping"
              onError={ onError }
              onSubmit={ onSubmit }
            >
                { this.renderLoginForm() }
                { this.renderAddress() }
                { this.renderBody() }
                { this.renderAction() }
            </Form>
        );
    }
}

export default CheckoutStep;
