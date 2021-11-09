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

import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import './PasswordChangePage.style';

/** @namespace Route/PasswordChangePage/Component */
export class PasswordChangePage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPasswordSuccess: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired
    };

    renderForm() {
        const {
            onPasswordSuccess,
            onError
        } = this.props;

        return (
            <Form
              key="reset-password"
              onSubmit={ onPasswordSuccess }
              onError={ onError }
            >
                <Field
                  type={ FIELD_TYPE.password }
                  label={ __('New password') }
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
                <Field
                  type={ FIELD_TYPE.password }
                  label={ __('Confirm password') }
                  attr={ {
                      id: 'password_confirmation',
                      name: 'password_confirmation',
                      placeholder: __('Retype your password'),
                      autocomplete: 'new-password'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.password,
                      match: (value) => {
                          const password = document.getElementById('password');
                          return password.value === value;
                      },
                      customErrorMessages: {
                          onMatchFail: __('Passwords do not match!')
                      }
                  } }
                  addRequiredTag
                />
                <div block="MyAccount" elem="Buttons">
                    <button
                      type="submit"
                      block="PasswordChangePage"
                      elem="Button"
                      mix={ { block: 'Button' } }
                    >
                        { __('Update Password') }
                    </button>
                </div>
            </Form>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="PasswordChangePage" aria-label={ __('Password Change Page') }>
                <ContentWrapper
                  mix={ { block: 'PasswordChangePage' } }
                  wrapperMix={ { block: 'PasswordChangePage', elem: 'Wrapper' } }
                  label={ __('Password Change Actions') }
                >
                    <Loader isLoading={ isLoading } />
                    <h1>{ __('Change My Password') }</h1>
                    { this.renderForm() }
                </ContentWrapper>
            </main>
        );
    }
}

export default PasswordChangePage;
