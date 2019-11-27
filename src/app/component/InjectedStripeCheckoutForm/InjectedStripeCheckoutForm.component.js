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
import React, { PureComponent } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';

/**
 * @class InjectedStripeCheckoutForm
 */
class InjectedStripeCheckoutForm extends PureComponent {
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
     * If card required 3ds authorization - handle it and place order if success
     * @param paymentInformation
     * @param message
     * @param savePaymentInformation
     * @returns {null|boolean}
     */
    handleAuthorization(paymentInformation, message, savePaymentInformation) {
        const {
            stripe: { retrievePaymentIntent, handleCardAction, handleCardPayment },
            showNotification
        } = this.props;

        // 500 server side errors
        if (typeof message === 'undefined') return false;

        // todo refactor
        const clientSecret = message.indexOf('Authentication Required: ') === 0
            ? message.substring('Authentication Required: '.length).split(',')[0]
            : null;


        if (!clientSecret) {
            showNotification('error', __('Error during card authentication'));
            return null;
        }

        retrievePaymentIntent(clientSecret).then((result) => {
            if (result.paymentIntent.status === 'requires_action'
                || result.paymentIntent.status === 'requires_source_action'
            ) {
                if (result.paymentIntent.confirmation_method === 'manual') {
                    handleCardAction(clientSecret).then((cardActionResponse) => {
                        if (cardActionResponse.error) {
                            showNotification('error', cardActionResponse.error.message);
                            return false;
                        }

                        savePaymentInformation(paymentInformation);
                        return true;
                    });
                } else {
                    handleCardPayment(clientSecret).then((cardPaymentResponse) => {
                        if (cardPaymentResponse.error) {
                            showNotification('error', cardPaymentResponse.error.message);
                            return false;
                        }

                        savePaymentInformation(paymentInformation);
                        return true;
                    });
                }
            }
        });

        return false;
    }

    /**
     * Submit order information and create token
     * @returns {Promise<{callback: InjectedStripeCheckoutForm.handleAuthorization, token: string}|{callback: null, token: null}>}
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
            return { token: null, callback: null };
        }

        return {
            token: `${paymentMethod.id}:${paymentMethod.card.brand}:${paymentMethod.card.last4}`,
            callback: this.handleAuthorization
        };
    }

    render() {
        return (
            <CardElement hidePostalCode />
        );
    }
}

export default injectStripe(InjectedStripeCheckoutForm);
