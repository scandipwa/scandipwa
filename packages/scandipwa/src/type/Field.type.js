/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';

import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

export const LabelType = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

export const OptionType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: LabelType,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

export const CustomErrorMessagesType = PropTypes.shape({
    onRequirementFail: PropTypes.string,
    onInputTypeFail: PropTypes.string,
    onMatchFail: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onRangeFailMin: PropTypes.string,
    onRangeFailMax: PropTypes.string,
    onExtensionFail: PropTypes.string
});

export const ValidationRuleType = PropTypes.shape({
    isRequired: PropTypes.bool,
    inputType: PropTypes.oneOf(Object.values(VALIDATION_INPUT_TYPE)),
    match: PropTypes.func,
    customErrorMessages: CustomErrorMessagesType
});

export const EventsType = PropTypes.objectOf(PropTypes.func);

export const FieldAttrType = PropTypes.object;

export const FieldOptionsType = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: LabelType,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
);

export const ValuesShape = PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});

export const ErrorMessageShape = PropTypes.shape({
    injectables: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string
});

export const errorFieldShape = PropTypes.arrayOf(PropTypes.shape({
    errorMessages: PropTypes.arrayOf(ErrorMessageShape),
    ...ValuesShape
}));

export const FieldGroupValidationResponseType = PropTypes.shape({
    errorFields: PropTypes.arrayOf(errorFieldShape),
    errorMessages: PropTypes.arrayOf(ErrorMessageShape),
    values: PropTypes.arrayOf(ValuesShape)
});
