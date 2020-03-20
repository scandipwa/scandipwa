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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertQueryStringToKeyValuePairs } from 'Util/Url';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { showNotification } from 'Store/Notification';
import { LocationType } from 'Type/Router';
import { updateMeta } from 'Store/Meta';

import ConfirmAccountPage from './ConfirmAccountPage.component';

export const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    },
    updateMeta: meta => dispatch(updateMeta(meta)),
    confirmAccount: options => MyAccountDispatcher.confirmAccount(options, dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    signIn: options => MyAccountDispatcher.signIn(options, dispatch)
});

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
        onConfirmAttempt: this.onConfirmAttempt.bind(this),
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            isLoading: false
        };
    }

    componentDidMount() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Confirm account') });

        this._updateBreadcrumbs();
    }

    onConfirmAttempt() {
        this.setState({ isLoading: true });
    }

    onConfirmSuccess(fields) {
        const {
            location: { search },
            confirmAccount,
            signIn
        } = this.props;

        const { password } = fields;

        const options = convertQueryStringToKeyValuePairs(search);
        const { email } = options;

        confirmAccount({ ...options, password })
            .then(() => signIn({ email, password }))
            .then(() => this.setState({ redirect: true }))
            .catch(() => this.setState({ isLoading: false }));
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
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }


    render() {
        return (
            <ConfirmAccountPage
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPageContainer);
