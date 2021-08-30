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
import { Redirect } from 'react-router';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import Field from 'Component/PureForm/Field';
import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import Form from 'Component/PureForm/Form';
import { isSignedIn } from 'Util/Auth';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import './ConfirmAccountPage.style';

/** @namespace Route/ConfirmAccountPage/Component */
export class ConfirmAccountPage extends PureComponent {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onConfirmSuccess: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired
    };

    renderForm() {
        const {
            onConfirmSuccess,
            onFormError
        } = this.props;

        return (
            <Form
              mix={ { block: 'ConfirmAccountPage', elem: 'Form' } }
              key="confirm-account"
              onSubmit={ onConfirmSuccess }
              onError={ onFormError }
            >
                { /*
                    Added email field with display:none to fix warning
                    `Password forms should have (optionally hidden) username fields for accessibility`
                */ }
                <Field
                  type={ FIELD_TYPE.email }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email'
                  } }
                  mix={ { block: 'ConfirmAccountPage', elem: 'EmailInput' } }
                />
                <Field
                  type={ FIELD_TYPE.password }
                  label={ __('Password') }
                  attr={ {
                      id: 'password',
                      name: 'password',
                      placeholder: __('Enter your password'),
                      autocomplete: 'new-password'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.password
                  } }
                  addRequiredTag
                />
                <button
                  type="submit"
                  block="Button"
                  mix={ { block: 'ConfirmAccountPage', elem: 'Button' } }
                >
                    { __('Confirm your account') }
                </button>
            </Form>
        );
    }

    render() {
        const {
            redirect,
            isLoading
        } = this.props;

        if (redirect || isSignedIn()) {
            return <Redirect to="/my-account/dashboard" />;
        }

        return (
            <main block="ConfirmAccountPage" aria-label={ __('Confirm Account Page') }>
                <ContentWrapper
                  wrapperMix={ { block: 'ConfirmAccountPage', elem: 'Wrapper' } }
                  label={ __('Confirm Account Action') }
                >
                    <Loader isLoading={ isLoading } />
                    <h1 block="ConfirmAccountPage" elem="Heading">
                        { __('Confirm your account') }
                    </h1>
                    { this.renderForm() }
                </ContentWrapper>
            </main>
        );
    }
}

export default ConfirmAccountPage;
