/* eslint-disable react/no-unused-state */
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
import './InjectedStripeCheckoutForm.style';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

/**
 * @class InjectedStripeCheckoutForm
 */
export class InjectedStripeCheckoutForm extends PureComponent {
     static propTypes = {
         stripe: PropTypes.oneOfType([
             PropTypes.object,
             PropTypes.func
         ]).isRequired,
         email: PropTypes.string,
         billingAddress: PropTypes.shape({
             city: PropTypes.string,
             company: PropTypes.string,
             country_id: PropTypes.string,
             email: PropTypes.string,
             firstname: PropTypes.string,
             lastname: PropTypes.string,
             postcode: PropTypes.string,
             region_id: PropTypes.oneOfType([
                 PropTypes.number,
                 PropTypes.string
             ]),
             region: PropTypes.oneOfType([
                 PropTypes.object,
                 PropTypes.string
             ]),
             street: PropTypes.oneOfType([
                 PropTypes.string,
                 PropTypes.array
             ]),
             telephone: PropTypes.string
         }).isRequired,
         showNotification: PropTypes.func.isRequired,
         onRef: PropTypes.func.isRequired
     };

    static defaultProps = {
        email: null
    };

    constructor(props) {
        super(props);

        this.state = { complete: false };
        this.submit = this.submit.bind(this);
        this.handleAuthorization = this.handleAuthorization.bind(this);
    }

    componentDidMount() {
        const { onRef } = this.props;
        onRef(this);
    }

    componentWillUnmount() {
        const { onRef } = this.props;
        onRef(undefined);
    }

    /**
     * Handles the response from a card action or a card payment after authorization is complete
     * @param response the API response
     * @param savePaymentInformation
     * @param paymentInformation
     * @returns {boolean} true on success, false otherwise
     */
    handlePostAuthorization(response, savePaymentInformation, paymentInformation) {
        const { showNotification } = this.props;

        if (response.error) {
            showNotification('error', response.error.message);
            return false;
        }

        savePaymentInformation(paymentInformation);
        return true;
    }

    /**
     * If card required 3ds authorization - handle it and place order if success
     * @param paymentInformation
     * @param secret
     * @param savePaymentInformation
     */
    handleAuthorization(paymentInformation, secret, savePaymentInformation) {
        const {
            stripe: { retrievePaymentIntent, handleCardAction, handleCardPayment }
        } = this.props;

        retrievePaymentIntent(secret).then((result) => {
            const { paymentIntent: { status, confirmation_method } } = result;

            if (['requires_action', 'requires_source_action'].includes(status)) {
                if (confirmation_method === 'manual') {
                    handleCardAction(secret).then(
                        (response) => this.handlePostAuthorization(response, savePaymentInformation, paymentInformation)
                    );
                } else {
                    handleCardPayment(secret).then(
                        (response) => this.handlePostAuthorization(response, savePaymentInformation, paymentInformation)
                    );
                }
            }
        });
    }

    /**
     * Submit order information and create token
     * @returns {Promise<{handleAuthorization: InjectedStripeCheckoutForm.handleAuthorization, token: string}|{handleAuthorization: null, token: null}>}
     */
    async submit() {
        const {
            stripe: { createPaymentMethod },
            billingAddress: {
                firstname,
                lastname,
                telephone: phone,
                city,
                country_id: country,
                street,
                region: state
            },
            email
        } = this.props;

        const billingName = `${ firstname } ${ lastname }`;

        const { paymentMethod } = await createPaymentMethod(
            'card',
            {
                billing_details: {
                    name: billingName,
                    email,
                    phone,
                    address: {
                        city,
                        country,
                        line1: street[0],
                        state
                    }
                }
            }
        );

        if (!paymentMethod) {
            return { token: null, handleAuthorization: null };
        }

        return {
            token: `${paymentMethod.id}:${paymentMethod.card.brand}:${paymentMethod.card.last4}`,
            handleAuthorization: this.handleAuthorization
        };
    }

    render() {
        return (
            <div block="InjectedStripeCheckoutForm">
                <CardElement hidePostalCode />
            </div>
        );
    }
}

export default injectStripe(InjectedStripeCheckoutForm);
