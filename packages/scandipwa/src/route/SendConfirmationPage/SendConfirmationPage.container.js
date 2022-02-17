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
import { connect } from 'react-redux';

import { ERROR_TYPE } from 'Component/Notification/Notification.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router.type';
import { convertQueryStringToKeyValuePairs } from 'Util/Url';

import SendConfirmationPage from './SendConfirmationPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/SendConfirmationPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Route/SendConfirmationPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resendConfirmation: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.resendConfirmation(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Route/SendConfirmationPage/Container */
export class SendConfirmationPageContainer extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        updateMeta: PropTypes.func.isRequired,
        resendConfirmation: PropTypes.func.isRequired,
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
            email: '',
            redirect: false,
            isLoading: false
        };
    }

    componentDidMount() {
        const { updateMeta, toggleBreadcrumbs } = this.props;

        updateMeta({ title: __('Send confirmation') });
        toggleBreadcrumbs(false);
    }

    containerProps() {
        const { email, redirect, isLoading } = this.state;

        return {
            email,
            redirect,
            isLoading,
            shouldDisplayWarning: this.shouldDisplayWarning()
        };
    }

    shouldDisplayWarning() {
        const { location: { search } } = this.props;
        const { email } = convertQueryStringToKeyValuePairs(search);

        if (email) {
            this.setState({ email });
        }

        return !email;
    }

    onConfirmSuccess() {
        const {
            location: { search },
            resendConfirmation
        } = this.props;

        this.setState({ isLoading: true });

        const options = convertQueryStringToKeyValuePairs(search);

        resendConfirmation({ ...options })
            .then(
                /** @namespace Route/SendConfirmationPage/Container/SendConfirmationPageContainer/onConfirmSuccess/then/catch/resendConfirmation/then */
                (data) => {
                    if (data === ERROR_TYPE) {
                        return Promise.reject();
                    }

                    this.setState({ redirect: true });

                    return true;
                }
            )
            .catch(
                /** @namespace Route/SendConfirmationPage/Container/SendConfirmationPageContainer/onConfirmSuccess/then/catch */
                () => this.setState({ isLoading: false })
            );
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <SendConfirmationPage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirmationPageContainer);
