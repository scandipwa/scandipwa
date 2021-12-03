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

import { FIELD_TYPE } from 'Component/Field/Field.config';
import FieldForm from 'Component/FieldForm';

import newsletterSubscriptionForm from './NewsletterForm.form';

import './NewsletterSubscription.style';

/**
 * Newsletter Subscription form
 * @class NewsletterSubscription
 * @namespace Component/NewsletterSubscription/Component
 */
export class NewsletterSubscription extends FieldForm {
    static propTypes = {
        onFormSubmit: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    get fieldMap() {
        return newsletterSubscriptionForm();
    }

    renderActions() {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mods={ { isHollow: true } }
              aria-label={ __('Submit') }
            >
                { __('Subscribe') }
            </button>
        );
    }

    renderFormBody() {
        const { isLoading } = this.props;

        return (
            <div block="FieldForm" elem="Fieldset" mods={ { isLoading } }>
                { super.renderFormBody() }
            </div>
        );
    }

    getFormProps() {
        const { onFormSubmit } = this.props;

        return {
            onSubmit: onFormSubmit
        };
    }

    render() {
        return (
            <div block="NewsletterSubscription">
                { super.render() }
            </div>
        );
    }
}

export default NewsletterSubscription;
