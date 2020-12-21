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

import FieldForm from 'Component/FieldForm';
import { customerType } from 'Type/Account';

import './MyAccountNewsletterSubscription.style.scss';

/** @namespace Component/MyAccountNewsletterSubscription/Component */
export class MyAccountNewsletterSubscription extends FieldForm {
    static propTypes = {
        customer: customerType.isRequired,
        onCustomerSave: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onCustomerSave } = this.props;
        onCustomerSave(fields);
    };

    getDefaultValues(fieldEntry) {
        const [key] = fieldEntry;
        const { customer: { [key]: value } } = this.props;

        return {
            ...super.getDefaultValues(fieldEntry),
            value
        };
    }

    get fieldMap() {
        const { customer: { is_subscribed } } = this.props;

        return {
            is_subscribed: {
                type: 'checkbox',
                label: __('General subscription'),
                value: 'is_subscribed',
                checked: is_subscribed
            }
        };
    }

    renderFields() {
        return (
            <div
              block="FieldForm"
              elem="Fields"
              mix={ { block: 'MyAccountNewsletterSubscription' } }
            >
                { Object.entries(this.fieldMap).map(this.renderField) }
            </div>
        );
    }

    renderActions() {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'MyAccountNewsletterSubscription', elem: 'Button' } }
            >
                { __('Save changes') }
            </button>
        );
    }
}

export default MyAccountNewsletterSubscription;
