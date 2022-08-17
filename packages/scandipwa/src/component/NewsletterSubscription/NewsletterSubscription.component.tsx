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

import { FieldType } from 'Component/Field/Field.config';
import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';

import newsletterSubscriptionForm from './NewsletterForm.form';
import { NewsletterSubscriptionComponentProps } from './NewsletterSubscription.type';

import './NewsletterSubscription.style';

/**
 * Newsletter Subscription form
 * @class NewsletterSubscription
 * @namespace Component/NewsletterSubscription/Component
 */
export class NewsletterSubscription extends FieldForm<NewsletterSubscriptionComponentProps> {
    fieldMap(): Partial<FieldContainerProps>[] {
        return newsletterSubscriptionForm();
    }

    renderActions(): ReactElement {
        return (
            <button
              type={ FieldType.SUBMIT }
              block="Button"
              mods={ { isHollow: true } }
              aria-label={ __('Submit') }
            >
                { __('Subscribe') }
            </button>
        );
    }

    renderFormBody(): ReactElement {
        const { isLoading } = this.props;

        return (
            <div block="FieldForm" elem="Fieldset" mods={ { isLoading } }>
                { super.renderFormBody() }
            </div>
        );
    }

    getFormProps(): Partial<FormContainerProps> {
        const { onFormSubmit } = this.props;

        return {
            onSubmit: onFormSubmit
        };
    }

    render(): ReactElement {
        return (
            <div block="NewsletterSubscription">
                { super.render() }
            </div>
        );
    }
}

export default NewsletterSubscription;
