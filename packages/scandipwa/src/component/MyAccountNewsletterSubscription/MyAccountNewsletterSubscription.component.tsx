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

import { FieldType } from 'Component/Field/Field.config';
import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';

import { MyAccountNewsletterSubscriptionComponentProps } from './MyAccountNewsletterSubscription.type';

import './MyAccountNewsletterSubscription.style.scss';

/** @namespace Component/MyAccountNewsletterSubscription/Component */
export class MyAccountNewsletterSubscriptionComponent<
P extends Readonly<MyAccountNewsletterSubscriptionComponentProps> = Readonly<MyAccountNewsletterSubscriptionComponentProps>,
S extends MyAccountNewsletterSubscriptionComponentState = MyAccountNewsletterSubscriptionComponentState,
> extends FieldForm<P, S> {
    fieldMap(): Partial<FieldContainerProps>[] {
        const { setSubscriptionStatus, isSubscriptionSelected } = this.props;

        return [
            {
                type: FieldType.CHECKBOX,
                attr: {
                    name: 'isSubscribed',
                    defaultChecked: isSubscriptionSelected,
                },
                events: {
                    onChange: setSubscriptionStatus,
                },
                label: __('General subscription'),
            },
        ];
    }

    renderFormBody(): ReactElement {
        return (
            <div
              block="FieldForm"
              elem="Fields"
              mix={ { block: 'MyAccountNewsletterSubscription' } }
            >
                { super.renderFormBody() }
            </div>
        );
    }

    getFormProps(): Partial<FormContainerProps> {
        const { onCustomerSave, onError } = this.props;

        return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSubmit: onCustomerSave,
            onError,
            returnAsObject: true,
        };
    }

    renderActions(): ReactElement {
        return (
            <button
              type={ FieldType.SUBMIT }
              block="Button"
              mix={ { block: 'MyAccountNewsletterSubscription', elem: 'Button' } }
              aria-label={ __('Submit') }
            >
                { __('Save changes') }
            </button>
        );
    }
}

export default MyAccountNewsletterSubscriptionComponent;
