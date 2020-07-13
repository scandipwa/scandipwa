/* eslint-disable max-len */

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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification';
import { MyAccountDispatcher } from 'Store/MyAccount';

import NewsletterSignup from './NewsletterSignup.component';

export const mapDispatchToProps = dispatch => ({
    signupNewsletter: options => MyAccountDispatcher.signupNewsletter(options, dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class NewsletterSignupContainer extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
        signupNewsletter: PropTypes.func.isRequired
    };

    containerFunctions = {
        onSignupNewsletterAttempt: this.onSignupNewsletterAttempt.bind(this),
        onSignupNewsletterSuccess: this.onSignupNewsletterSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    state = {
        isLoading: false
    };

    onSignupNewsletterAttempt() {
        this.setState({ isLoading: true });
    }

    onSignupNewsletterSuccess(fields) {
        const { signupNewsletter, showNotification } = this.props;

        signupNewsletter(fields).then(
            () => {
                showNotification('success', __('You will now get a email you need to confirm to signup for our newsletter'));
                this.setState({ isLoading: false });
            },
            (error) => {
                showNotification('error', error[0].message);
                this.setState({ isLoading: false });
            }
        );
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <NewsletterSignup
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(NewsletterSignupContainer);
