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
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router';
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

/** @namespace Component/ConfirmAccountPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ConfirmAccountPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    confirmAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.confirmAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    )
});

/** @namespace Component/ConfirmAccountPage/Container */
export class ConfirmAccountPageContainer extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        signIn: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        confirmAccount: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    containerFunctions = {
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    componentDidMount() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Confirm account') });

        this._updateBreadcrumbs();
    }

    __construct(props) {
        super.__construct(props);

        this.state = {
            redirect: false,
            isLoading: false
        };
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

    _updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/account/confirmAccount',
                name: __('Confirm Account')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
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
