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

import { PureComponent } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import Field from 'Component/Field';
import Form from 'Component/Form';
import { getQueryParam } from 'Util/Url';
import { LocationType } from 'Type/Common';
import './PasswordChangePage.style';

const STATUS_PASSOWORD_UPDATED = 'password_updated';
const STATUS_PASSOWORD_MISSMATCH = 'passwords_miss_match';

export default class PasswordChangePage extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        resetPassword: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    state = {
        passwordResetStatus: '',
        isLoading: false
    };

    componentDidMount() {
        this.updateBreadcrumbs();
    }

    static getDerivedStateFromProps(props) {
        const { passwordResetStatus, showNotification } = props;
        const stateToBeUpdated = {};

        if (passwordResetStatus) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.passwordResetStatus = passwordResetStatus;

            switch (passwordResetStatus) {
            case STATUS_PASSOWORD_UPDATED:
                showNotification('success', __('Password has been successfully updated!'));
                break;
            case STATUS_PASSOWORD_MISSMATCH:
                showNotification('info', __('Your password and confirmation password do not match.'));
                break;
            default:
                showNotification('error', __('Error! Something went wrong'));
            }
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    onPasswordSuccess = (fields) => {
        const { resetPassword, location } = this.props;
        const { passwordReset: password, passwordResetConfirm: password_confirmation } = fields;
        const token = getQueryParam('token', location);

        resetPassword({ token, password, password_confirmation });
    };

    onPasswordAttempt = () => {
        this.setState({ isLoading: true });
    };

    onError = () => {
        this.setState({ isLoading: false });
    };

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/createPassword',
                name: __('Change password')
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    render() {
        const { passwordResetStatus, isLoading } = this.state;

        if (passwordResetStatus === STATUS_PASSOWORD_UPDATED) {
            return <Redirect to="/" />;
        }

        return (
            <>
                <main block="PasswordChangePage" aria-label={ __('Password Change Page') }>
                    <ContentWrapper
                      mix={ { block: 'PasswordChangePage' } }
                      wrapperMix={ { block: 'PasswordChangePage', elem: 'Wrapper' } }
                      label={ __('Password Change Actions') }
                    >
                        <Loader isLoading={ isLoading } />
                        <h1>{ __('Change My Password') }</h1>
                        <Form
                          key="reset-password"
                          onSubmit={ this.onPasswordAttempt }
                          onSubmitSuccess={ this.onPasswordSuccess }
                          onSubmitError={ this.onError }
                        >
                            <Field
                              type="password"
                              label={ __('New password') }
                              id="passwordReset"
                              name="passwordReset"
                              validation={ ['notEmpty', 'password'] }
                            />
                            <Field
                              type="password"
                              label={ __('Confirm password') }
                              id="passwordResetConfirm"
                              name="passwordResetConfirm"
                              validation={ ['notEmpty', 'password'] }
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
                    </ContentWrapper>
                </main>
            </>
        );
    }
}
