/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction, @scandipwa/scandipwa-guidelines/no-duplicate-namespaces */
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

import CheckoutRegisterFormComponent from 'Component/CheckoutRegisterForm/CheckoutRegisterForm.component';
import {
    CHECKOUT_REGISTRATION_STATE_FORM_HIDDEN,
    CHECKOUT_REGISTRATION_STATE_FORM_VISIBLE,
    CHECKOUT_REGISTRATION_STATE_SUCCESS,
    CHECKOUT_REGISTRATION_STATE_SUCCESS_EMAIL
} from 'Component/CheckoutRegisterForm/CheckoutRegistrationForm.config';
import {
    mapDispatchToProps,
    MyAccountCreateAccountContainer
} from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.container';
import MyAccountQuery from 'Query/MyAccount.query';
import OrderQuery from 'Query/Order.query';
import { addressType } from 'Type/Account';
import { fetchMutation } from 'Util/Request';

/** @namespace Component/CheckoutRegisterForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number,
    emailValue: state.CheckoutReducer.email,
    shippingFields: state.CheckoutReducer.shippingFields,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Component/CheckoutRegisterForm/Container/CheckoutRegisterFormContainer */
export class CheckoutRegisterFormContainer extends MyAccountCreateAccountContainer {
    static propTypes = {
        ...MyAccountCreateAccountContainer.propTypes,
        orderID: PropTypes.string.isRequired,
        emailValue: PropTypes.string.isRequired,
        shippingFields: addressType.isRequired,
        isSignedIn: PropTypes.bool.isRequired
    };

    containerFunctions = {
        onCreateAccountSuccess: this.onCreateAccountSuccess.bind(this),
        getRegistrationState: this.getRegistrationState.bind(this),
        setFormVisible: this.setRegistrationState.bind(this, CHECKOUT_REGISTRATION_STATE_FORM_VISIBLE)
    };

    state = {
        registrationState: CHECKOUT_REGISTRATION_STATE_FORM_HIDDEN
    };

    setRegistrationState(value) {
        this.setState({ registrationState: value });
    }

    getRegistrationState() {
        return this.state.registrationState;
    }

    getCustomerData(fields) {
        const {
            password,
            email,
            firstname,
            lastname,
            is_subscribed,
            taxvat
        } = fields;

        return {
            customer: {
                firstname,
                lastname,
                email,
                is_subscribed,
                taxvat
            },
            password
        };
    }

    onCreateAccountSuccess(fields) {
        const {
            setLoadingState,
            isLoading,
            showNotification
        } = this.props;

        if (isLoading) {
            return;
        }

        setLoadingState(true);
        const mutation = MyAccountQuery.getCreateAccountMutation(this.getCustomerData(fields));

        // eslint-disable-next-line consistent-return
        return fetchMutation(mutation).then(
            /** @namespace Component/CheckoutRegisterForm/Container/fetchMutation/then */
            (data) => {
                setLoadingState(false);

                const { createCustomer: { customer } } = data;
                const { confirmation_required, email } = customer;

                this.linkOrder(email);

                if (confirmation_required) {
                    this.setState({ registrationState: CHECKOUT_REGISTRATION_STATE_SUCCESS_EMAIL });
                } else {
                    this.setState({ registrationState: CHECKOUT_REGISTRATION_STATE_SUCCESS });
                }
            },
            /** @namespace Component/CheckoutRegisterForm/Container/fetchMutation/then */
            (error) => {
                showNotification('error', error[0].message);
                setLoadingState(false);
            }
        );
    }

    linkOrder(customerEmail) {
        const {
            setLoadingState,
            showNotification
        } = this.props;

        setLoadingState(true);
        const mutation = OrderQuery.linkOrderMutation(customerEmail);

        return fetchMutation(mutation).then(
            /** @namespace Component/CheckoutRegisterForm/Container/fetchMutation/then */
            () => {
                setLoadingState(false);
            },
            /** @namespace Component/CheckoutRegisterForm/Container/fetchMutation/then */
            (error) => {
                showNotification('error', error[0].message);
                setLoadingState(false);
            }
        );
    }

    getAllProps() {
        const {
            emailValue = '',
            shippingFields: {
                firstname = '',
                lastname = ''
            }
        } = this.props;

        const defaultValues = {
            email: emailValue,
            firstName: firstname,
            lastName: lastname
        };

        return {
            ...this.props,
            ...this.state,
            ...this.containerProps,
            ...this.containerFunctions,
            defaultValues
        };
    }

    render() {
        const { isSignedIn } = this.props;
        if (isSignedIn) {
            return null;
        }

        return (
            <CheckoutRegisterFormComponent
              { ...this.getAllProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutRegisterFormContainer);
