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
import FieldForm from 'Component/PureForm/FieldForm';
import { customerType } from 'Type/Account';

import './MyAccountNewsletterSubscription.style.scss';

/** @namespace Component/MyAccountNewsletterSubscription/Component */
export class MyAccountNewsletterSubscription extends FieldForm {
    static propTypes = {
        customer: customerType.isRequired,
        onCustomerSave: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const { customer } = this.props;
        const { customer: nextCustomer } = nextProps;

        return customer !== nextCustomer;
    }

    get fieldMap() {
        const { customer: { is_subscribed } } = this.props;

        return [
            {
                type: FIELD_TYPE.checkbox,
                attr: {
                    name: 'isSubscribed',
                    defaultChecked: is_subscribed
                },
                label: __('General subscription')
            }
        ];
    }

    renderFormBody() {
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

    getFormProps() {
        const { onCustomerSave, onError } = this.props;

        return {
            onSubmit: onCustomerSave,
            onError,
            returnAsObject: true
        };
    }

    renderActions() {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mix={ { block: 'MyAccountNewsletterSubscription', elem: 'Button' } }
              aria-label={ __('Submit') }
            >
                { __('Save changes') }
            </button>
        );
    }
}

export default MyAccountNewsletterSubscription;
