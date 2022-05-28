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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Redirect } from 'react-router';

import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { isSignedIn } from 'Util/Auth';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import './SendConfirmationPage.style';

/** @namespace Route/SendConfirmationPage/Component */
export class SendConfirmationPage extends PureComponent {
    static propTypes = {
        email: PropTypes.string,
        redirect: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        shouldDisplayWarning: PropTypes.bool.isRequired,
        onConfirmSuccess: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired
    };

    static defaultProps = {
        email: ''
    };

    renderWarningMessage() {
        const { shouldDisplayWarning } = this.props;

        if (!shouldDisplayWarning) {
            return null;
        }

        return (
            <div block="SendConfirmationPage" elem="WarningMsg">
                <h2>
                    { __('Unable to re-request confirmation email') }
                </h2>
                <div>
                    { __('The URL is invalid. Some parameters are missing.') }
                </div>
            </div>
        );
    }

    renderForm() {
        const {
            email,
            onConfirmSuccess,
            onFormError
        } = this.props;

        return (
            <Form
              mix={ { block: 'SendConfirmationPage', elem: 'Form' } }
              key="resend-confirmation"
              onSubmit={ onConfirmSuccess }
              onError={ onFormError }
            >
                <Field
                  type={ FIELD_TYPE.email }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      defaultValue: email,
                      placeholder: __('Your email name')
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.email
                  } }
                  addRequiredTag
                />
                <button
                  type="submit"
                  block="Button"
                  mix={ { block: 'SendConfirmationPage', elem: 'Button' } }
                >
                    { __('Send confirmation link') }
                </button>
            </Form>
        );
    }

    renderPageContents() {
        const { shouldDisplayWarning } = this.props;

        if (shouldDisplayWarning) {
            return null;
        }

        return (
            <>
                <h1 block="SendConfirmationPage" elem="Heading">
                    { __('Send confirmation link') }
                </h1>
                <p block="SendConfirmationPage" elem="SubHeading">
                    { __('Please enter your email below and we will send you the confirmation link.') }
                </p>
                { this.renderForm() }
            </>
        );
    }

    render() {
        const {
            redirect,
            isLoading
        } = this.props;

        if (redirect || isSignedIn()) {
            return <Redirect to="/" />;
        }

        return (
            <main block="SendConfirmationPage" aria-label={ __('Send Confirmation Page') }>
                <ContentWrapper
                  wrapperMix={ { block: 'SendConfirmationPage', elem: 'Wrapper' } }
                  label={ __('Send Confirmation Action') }
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderWarningMessage() }
                    { this.renderPageContents() }
                </ContentWrapper>
            </main>
        );
    }
}

export default SendConfirmationPage;
