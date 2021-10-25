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
    id: PropTypes.string,
    label: LabelType,
    value: PropTypes.string
});

export const CustomErrorMessagesType = PropTypes.shape({
    onRequirementFail: PropTypes.string,
    onInputTypeFail: PropTypes.string,
    onMatchFail: PropTypes.string,
    onRangeFailMin: PropTypes.string,
    onRangeFailMax: PropTypes.string
});

export const ValidationRuleType = PropTypes.shape({
    isRequired: PropTypes.bool,
    inputType: PropTypes.oneOf(Object.values(VALIDATION_INPUT_TYPE)),
    match: PropTypes.func,
    customErrorMessages: CustomErrorMessagesType
});

export const EventsType = PropTypes.objectOf(PropTypes.func);
