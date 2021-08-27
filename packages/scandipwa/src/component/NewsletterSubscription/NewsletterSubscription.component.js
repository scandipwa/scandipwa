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

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import FieldForm from 'Component/PureForm/FieldForm/FieldForm.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

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
        return [
            {
                type: FIELD_TYPE.email,
                attr: {
                    name: 'newsletterEmail',
                    placeholder: __('Enter your email address'),
                    'aria-label': __('Email address')
                },
                validateOn: ['onChange'],
                validationRule: {
                    isRequired: true,
                    inputType: VALIDATION_INPUT_TYPE.email
                }
            }
        ];
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
