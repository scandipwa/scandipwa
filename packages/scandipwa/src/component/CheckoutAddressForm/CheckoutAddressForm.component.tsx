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

import { FocusEventHandler, ReactEventHandler } from 'react';

import { FieldContainerProps } from 'Component/Field/Field.type';
import { FormSection } from 'Component/FieldForm/FieldForm.type';
import { FieldGroupEventData } from 'Component/FieldGroup/FieldGroup.type';
import MyAccountAddressForm from 'Component/MyAccountAddressForm/MyAccountAddressForm.component';
import myAccountAddressForm from 'Component/MyAccountAddressForm/MyAccountAddressForm.form';
import { EstimateAddress } from 'Route/Checkout/Checkout.type';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import transformToNameValuePair from 'Util/Form/Transform';

import { CheckoutAddressFormComponentProps, EstimateAddressFields } from './CheckoutAddressForm.type';

/** @namespace Component/CheckoutAddressForm/Component */
export class CheckoutAddressFormComponent extends MyAccountAddressForm<CheckoutAddressFormComponentProps> {
    static defaultProps: Partial<CheckoutAddressFormComponentProps> = {
        ...MyAccountAddressForm.defaultProps,
        onShippingEstimationFieldsChange: noopFn,
    };

    lastRequest: EstimateAddress | null = null;

    __construct(props: CheckoutAddressFormComponentProps): void {
        super.__construct?.(props);

        this.onAddressChange = this.onAddressChange.bind(this);
    }

    fieldMap(): (Partial<FieldContainerProps> | FormSection)[] {
        const {
            address,
            countries,
            addressLinesQty,
            regionDisplayAll,
            showVatNumber,
            defaultCountry,
            availableRegions,
            isStateRequired,
            countryId,
            currentRegion,
            currentCity,
            currentRegionId,
            currentZipcode,
            onCountryChange,
            onZipcodeChange,
            onCityChange,
            onRegionChange,
            onRegionIdChange,
        } = this.props;

        const fieldMap = myAccountAddressForm({
            address,
            countries,
            addressLinesQty,
            regionDisplayAll,
            showVatNumber,
            defaultCountry,
            availableRegions,
            isStateRequired,
            countryId,
            currentRegion,
            currentCity,
            currentRegionId,
            currentZipcode,
            ...address,
        }, {
            onCountryChange,
            onZipcodeChange,
            onCityChange,
            onRegionChange,
            onRegionIdChange,
        });

        const addressGroup = fieldMap.find((element) => {
            if (!('name' in element)) {
                return false;
            }

            const { name } = element;

            return name === 'addressGroup';
        }) as FormSection | undefined;

        if (addressGroup && 'events' in addressGroup) {
            addressGroup.events = {
                // Updates shipping methods on address blurt
                onBlur: this.onAddressChange,
                // Updates shipping methods on start
                onLoad: this.onAddressChange,
            };
        }

        fieldMap.splice(0, 2);

        return fieldMap;
    }

    onAddressChange(event: FocusEventHandler | ReactEventHandler, data: FieldGroupEventData): void {
        const { fields = {} } = data;
        const {
            country_id,
            region_id: regionId,
            region_string: region,
            city,
            postcode,
        } = transformToNameValuePair<EstimateAddressFields>(fields);

        const { onShippingEstimationFieldsChange } = this.props;
        const request = {
            country_id,
            region_id: regionId !== '' ? Number(regionId) : undefined,
            region,
            city,
            postcode,
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

export default CheckoutAddressFormComponent;
