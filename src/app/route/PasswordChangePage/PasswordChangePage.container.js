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
import { Redirect } from 'react-router';

import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Common';
import { getQueryParam } from 'Util/Url';

import PasswordChangePage from './PasswordChangePage.component';
import {
    STATUS_PASSWORD_MISS_MATCH,
    STATUS_PASSWORD_UPDATED
} from './PasswordChangePage.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/PasswordChangePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    passwordResetStatus: state.MyAccountReducer.passwordResetStatus
});

/** @namespace Route/PasswordChangePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    resetPassword(options) {
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetPassword(options, dispatch)
        );
    },
    updateCustomerPasswordResetStatus(options) {
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateCustomerPasswordResetStatus(options, dispatch)
        );
    },
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

/** @namespace Route/PasswordChangePage/Container */
export class PasswordChangePageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        passwordResetStatus: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        resetPassword: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    state = {
        passwordResetStatus: '',
        isLoading: false
    };

    static getDerivedStateFromProps(props) {
        const { passwordResetStatus, showNotification } = props;
        const stateToBeUpdated = {};

        if (passwordResetStatus) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.passwordResetStatus = passwordResetStatus;

            switch (passwordResetStatus) {
            case STATUS_PASSWORD_UPDATED:
                showNotification('success', __('Password has been successfully updated!'));
                break;
            case STATUS_PASSWORD_MISS_MATCH:
                showNotification('info', __('Your password and confirmation password do not match.'));
                break;
            default:
                showNotification('error', __('Error! Something went wrong'));
            }
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    containerFunctions = {
        onPasswordAttempt: this.onPasswordAttempt.bind(this),
        onPasswordSuccess: this.onPasswordSuccess.bind(this),
        onError: this.onError.bind(this)
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
    }

    containerProps = () => {
        const { isLoading } = this.state;
        return { isLoading };
    };

    onPasswordSuccess(fields) {
        const { resetPassword, location } = this.props;
        const { passwordReset: password, passwordResetConfirm: password_confirmation } = fields;
        const token = getQueryParam('token', location);

        resetPassword({ token, password, password_confirmation });
    }

    onPasswordAttempt() {
        this.setState({ isLoading: true });
    }

    onError() {
        this.setState({ isLoading: false });
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Password Change Page') });
    }

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
        const { passwordResetStatus } = this.state;

        if (passwordResetStatus === STATUS_PASSWORD_UPDATED) {
            return <Redirect to="/" />;
        }

        return (
            <PasswordChangePage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePageContainer);
