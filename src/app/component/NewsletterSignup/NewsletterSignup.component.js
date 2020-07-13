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

import Form from 'Component/Form';
import Field from 'Component/Field';
import Loader from 'Component/Loader';

import './NewsletterSignup.style';

class NewsletterSignup extends PureComponent {
    static propTypes = {
        onSignupNewsletterAttempt: PropTypes.func.isRequired,
        onSignupNewsletterSuccess: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const {
            onSignupNewsletterAttempt,
            onSignupNewsletterSuccess,
            onFormError,
            isLoading
        } = this.props;

        return (
            <Form
              key="newsletter-form"
              id="newsletter-form"
              onSubmit={ onSignupNewsletterAttempt }
              onSubmitSuccess={ onSignupNewsletterSuccess }
              onSubmitError={ onFormError }
              mix={ { block: 'NewsletterSignup' } }
            >
                <Loader isLoading={ isLoading } />
                <Field
                  type="text"
                  id="newsletterEmail"
                  name="newsletterEmail"
                  placeholder={ __('Signup for newsletter with your email') }
                  mix={ { block: 'NewsletterSignup', elem: 'Input' } }
                  validation={ ['notEmpty', 'email'] }
                />
                <button
                  type="submit"
                  block="Button"
                  mix={ { block: 'NewsletterSignup', elem: 'Button' } }
                >
                    { __('Signup') }
                </button>
            </Form>
        );
    }
}

export default NewsletterSignup;
