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
import Form from 'Component/Form';
import Loader from 'Component/Loader';

import './PasswordChangePage.style';

/** @namespace Route/PasswordChangePage/Component */
export class PasswordChangePage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPasswordAttempt: PropTypes.func.isRequired,
        onPasswordSuccess: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired
    };

    renderForm() {
        const {
            onPasswordAttempt,
            onPasswordSuccess,
            onError
        } = this.props;

        // TODO: use FieldForm instead!!!

        return (
            <Form
              key="reset-password"
              onSubmit={ onPasswordAttempt }
              onSubmitSuccess={ onPasswordSuccess }
              onSubmitError={ onError }
            >
                <Field
                  type="password"
                  label={ __('New password') }
                  id="password"
                  name="password"
                  autocomplete="new-password"
                  validation={ ['notEmpty', 'password'] }
                />
                <Field
                  type="password"
                  label={ __('Confirm password') }
                  id="password_confirmation"
                  name="password_confirmation"
                  autocomplete="new-password"
                  validation={ ['notEmpty', 'password', 'password_match'] }
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
