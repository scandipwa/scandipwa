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

import { ERROR_TYPE } from 'Component/Notification/Notification.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router.type';
import transformToNameValuePair from 'Util/Form/Transform';
import { convertQueryStringToKeyValuePairs } from 'Util/Url';

import ConfirmAccountPage from './ConfirmAccountPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/ConfirmAccountPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Route/ConfirmAccountPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    confirmAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.confirmAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    )
});

/** @namespace Route/ConfirmAccountPage/Container */
export class ConfirmAccountPageContainer extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        signIn: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        confirmAccount: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired
    };

    containerFunctions = {
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            redirect: false,
            isLoading: false
        };
    }

    componentDidMount() {
        const { updateMeta, toggleBreadcrumbs } = this.props;

        updateMeta({ title: __('Confirm account') });
        toggleBreadcrumbs(false);
    }

    containerProps() {
        const { redirect, isLoading } = this.state;

        return {
            redirect,
            isLoading,
            shouldDisplayWarning: this.shouldDisplayWarning()
        };
    }

    shouldDisplayWarning() {
        const {
            location: {
                search
            }
        } = this.props;
        const { email, key } = convertQueryStringToKeyValuePairs(search);

        return !(email && key);
    }

    onConfirmAttempt() {
    }

    onConfirmSuccess(form, fields) {
        const {
            location: { search },
            confirmAccount,
            signIn
        } = this.props;

        this.setState({ isLoading: true });

        const { password } = transformToNameValuePair(fields);

        const options = convertQueryStringToKeyValuePairs(search);
        const { email } = options;

        confirmAccount({ ...options, password })
            .then(
                /** @namespace Route/ConfirmAccountPage/Container/ConfirmAccountPageContainer/onConfirmSuccess/then/catch/then/then/confirmAccount/then */
                (data) => {
                    const { msgType } = data || {};

                    if (msgType === ERROR_TYPE) {
                        // error message is handled in the dispatcher
                        // just abort the chain
                        return Promise.reject();
                    }

                    return signIn({ email, password });
                }
            )
            .then(
                /** @namespace Route/ConfirmAccountPage/Container/ConfirmAccountPageContainer/onConfirmSuccess/then/catch/then/then */
                () => this.setState({ redirect: true })
            )
            .catch(
                /** @namespace Route/ConfirmAccountPage/Container/ConfirmAccountPageContainer/onConfirmSuccess/then/catch */
                () => this.setState({ isLoading: false })
            );
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <ConfirmAccountPage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPageContainer);
