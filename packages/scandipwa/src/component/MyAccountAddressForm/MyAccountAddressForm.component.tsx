/* eslint-disable spaced-comment */
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
import { FormSection } from 'Component/FieldForm/FieldForm.type';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';
import { trimCustomerAddress } from 'Util/Address';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';

import myAccountAddressForm from './MyAccountAddressForm.form';
import { MyAccountAddressFormComponentProps, MyAccountAddressFormFields } from './MyAccountAddressForm.type';

/** @namespace Component/MyAccountAddressForm/Component */
export class MyAccountAddressForm extends FieldForm<MyAccountAddressFormComponentProps> {
    static defaultProps = {
        currentZipcode: null,
        currentCity: null,
        currentRegion: null,
        currentRegionId: null,
        isStateRequired: false
    };

    //#region GETTERS
    get fieldMap(): (Partial<FieldContainerProps> | FormSection)[] {
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
            onRegionIdChange
        } = this.props;

        return myAccountAddressForm({
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
            ...address
        }, {
            onCountryChange,
            onZipcodeChange,
            onCityChange,
            onRegionChange,
            onRegionIdChange
        });
    }

    getFormProps(): Partial<FormContainerProps> {
        return {
            onSubmit: this.onSubmit.bind(this)
        };
    }

    /**
     * Creates / Updates address from entered data
     * @param form
     * @param fields
     */
    onSubmit(form: HTMLFormElement, fields: FieldData[]): void {
        const { onSave, addressLinesQty } = this.props;
        const newAddress = transformToNameValuePair<MyAccountAddressFormFields>(fields);

        // Joins streets into one variable
        if (addressLinesQty > 1) {
            newAddress.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                const streetKey = `street_${i}`;

                if (streetKey in newAddress) {
                    newAddress.street.push(newAddress[streetKey as keyof MyAccountAddressFormFields] as string);
                }
            }
        }

        // Fixes region variable format
        const { region_id = 0, region_string: region } = newAddress;
        newAddress.region = { region_id: +region_id, region: region || '', region_code: '' };

        // Filters out non-required options and save address
        onSave(trimCustomerAddress(newAddress));
    }

    //#region RENDERERS
    renderActions(): ReactElement {
        return (
            <button
              type={ FieldType.SUBMIT }
              block="Button"
              mix={ { block: 'MyAccount', elem: 'Button' } }
              mods={ { isHollow: true } }
            >
                { __('Save address') }
            </button>
        );
    }
    //#endregion
}

export default MyAccountAddressForm;
