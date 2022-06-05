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

import MyAccountAddressForm from 'Component/MyAccountAddressForm/MyAccountAddressForm.component';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import transformToNameValuePair from 'Util/Form/Transform';

import { CheckoutAddressFormComponentProps } from './CheckoutAddressForm.type';

/** @namespace Component/CheckoutAddressForm/Component */
export class CheckoutAddressForm extends MyAccountAddressForm<CheckoutAddressFormComponentProps> {
    static defaultProps: Partial<CheckoutAddressFormComponentProps> = {
        ...MyAccountAddressForm.defaultProps,
        onShippingEstimationFieldsChange: noopFn
    };

    lastRequest = null;

    __construct(props: CheckoutAddressFormComponentProps): void {
        super.__construct?.(props);

        this.onAddressChange = this.onAddressChange.bind(this);
    }

    // componentDidMount(): void {
    //     const {
    //         address: {
    //             country_id,
    //             city,
    //             postcode,
    //             region: {
    //                 region,
    //                 region_id
    //             }
    //         },
    //         defaultCountry,
    //         onShippingEstimationFieldsChange
    //     } = this.props;

    //     onShippingEstimationFieldsChange({
    //         country_id: country_id || defaultCountry,
    //         region_id,
    //         region,
    //         city,
    //         postcode
    //     });
    // }

    get fieldMap() {
        const fieldMap = super.fieldMap;
        const addressGroup = fieldMap.find(({ name }) => name === 'addressGroup');

        if (addressGroup && 'events' in addressGroup) {
            addressGroup.events = {
                // Updates shipping methods on address blurt
                onBlur: this.onAddressChange,
                // Updates shipping methods on start
                onLoad: this.onAddressChange
            };
        }

        fieldMap.splice(0, 2);

        return fieldMap;
    }

    onAddressChange(event, data) {
        const { fields = {} } = data;
        const {
            country_id,
            region_id: regionId,
            region_string: region,
            city,
            postcode
        } = transformToNameValuePair(fields);

        const { onShippingEstimationFieldsChange } = this.props;
        const request = {
            country_id,
            region_id: regionId !== '' ? regionId : null,
            region,
            city,
            postcode
        };

        // If request hasn't changed, then ignore.
        if (JSON.stringify(request) === JSON.stringify(this.lastRequest)) {
            return;
        }

        onShippingEstimationFieldsChange(request);

        // Caches last request
        this.lastRequest = request;
    }

    renderActions(): ReactElement {
        return null;
    }

    render(): ReactElement {
        return (
            <div block="CheckoutAddressForm">
                { this.renderFormBody() }
            </div>
        );
    }
}

export default CheckoutAddressForm;
