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

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

export const getAddressFields = (props) => {
    const {
        addressLinesQty = 1,
        address: { street = [] }
    } = props;

    if (addressLinesQty === 1) {
        return [{
            type: FIELD_TYPE.text,
            label: __('Street address'),
            attr: {
                name: 'street',
                defaultValue: street[0] || '',
                placeholder: __('Your street address')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        }];
    }

    const streets = [];

    // eslint-disable-next-line fp/no-loops, fp/no-let
    for (let i = 0; i < addressLinesQty; i++) {
        streets.push({
            type: FIELD_TYPE.text,
            label: __('Street address line %s', i + 1),
            attr: {
                name: `street_${i}`,
                defaultValue: street[i] || '',
                placeholder: __('Your street address line %s', i + 1)
            },
            addRequiredTag: i === 0,
            validateOn: i === 0 ? ['onChange'] : [],
            validationRule: {
                isRequired: i === 0
            }
        });
    }

    return streets;
};

export const getRegionFields = (props, events) => {
    const {
        address: { region: { region } = {} },
        regionDisplayAll,
        availableRegions,
        regionId,
        isStateRequired
    } = props;

    const { setRegionId } = events;

    if (!regionDisplayAll && !isStateRequired) {
        return [];
    }

    if (!availableRegions || !availableRegions.length) {
        return [
            {
                type: FIELD_TYPE.text,
                label: __('State / Province'),
                attr: {
                    name: 'region_string',
                    defaultValue: region,
                    placeholder: __('Your state / province')
                },
                validateOn: isStateRequired ? ['onChange'] : [],
                validationRule: {
                    isRequired: isStateRequired
                }
            }
        ];
    }

    return [
        {
            type: FIELD_TYPE.select,
            label: __('State / Province'),
            attr: {
                name: 'region_id',
                defaultValue: regionId
            },
            events: {
                onChange: setRegionId
            },
            options: availableRegions.map(({ id, name }) => ({ id, label: name, value: id })),
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        }
    ];
};

export const getVatFields = (props) => {
    const { showVatNumber, vatNumber = '' } = props;

    if (!showVatNumber) {
        return [];
    }

    return [
        {
            type: FIELD_TYPE.text,
            label: __('VAT Number'),
            attr: {
                name: 'vat_number',
                defaultValue: vatNumber
            }
        }
    ];
};

export const myAccountAddressForm = (props, events) => {
    const {
        default_billing: defaultBilling,
        default_shipping: defaultShipping,
        firstname = '',
        lastname = '',
        city = '',
        countryId = 0,
        countries = [],
        postcode = '',
        telephone = ''
    } = props;

    const { onCountryChange, onZipcodeChange } = events;

    return [
        {
            type: FIELD_TYPE.checkbox,
            label: __('This is default Billing Address'),
            attr: {
                name: 'default_billing',
                defaultValue: defaultBilling
            }
        },
        {
            type: FIELD_TYPE.checkbox,
            label: __('This is default Shipping Address'),
            attr: {
                name: 'default_shipping',
                defaultValue: defaultShipping
            }
        },
        {
            type: FIELD_TYPE.text,
            label: __('First name'),
            attr: {
                name: 'firstname',
                defaultValue: firstname,
                placeholder: __('Your first name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        {
            type: FIELD_TYPE.text,
            label: __('Last name'),
            attr: {
                name: 'lastname',
                defaultValue: lastname,
                placeholder: __('Your last name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        ...getAddressFields(props),
        {
            type: FIELD_TYPE.text,
            label: __('City'),
            attr: {
                name: 'city',
                defaultValue: city,
                placeholder: __('Your city')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        {
            type: FIELD_TYPE.select,
            label: __('Country'),
            attr: {
                name: 'country_id',
                defaultValue: countryId
            },
            events: {
                onChange: onCountryChange
            },
            options: countries,
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        ...getRegionFields(props, events),
        {
            type: FIELD_TYPE.text,
            label: __('Zip / Postal code'),
            attr: {
                name: 'postcode',
                defaultValue: postcode,
                placeholder: __('Your zip / postal code')
            },
            events: {
                onBlurt: onZipcodeChange
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        ...getVatFields(props),
        {
            type: FIELD_TYPE.text,
            label: __('Phone number'),
            attr: {
                name: 'telephone',
                defaultValue: telephone,
                placeholder: __('Your phone number')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                inputType: VALIDATION_INPUT_TYPE.phone,
                isRequired: true
            }
        }
    ];
};

export default myAccountAddressForm;
