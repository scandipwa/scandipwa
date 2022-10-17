/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

export enum ValidationInputTypeText {
    ALPHA = 'alpha',
    ALPHASPACE = 'alphaSpace',
    ALPHANUMERIC = 'alphaNumeric',
    ALPHADASH = 'alphaDash',
    URL = 'url',
}

export enum ValidationInputTypeNumber {
    NUMERIC = 'numeric',
    NUMERICDASH = 'numericDash',
    INTEGER = 'integer',
    DECIMAL = 'decimal',
    NATURAL = 'natural',
    NATURALNOZERO = 'naturalNoZero',
}

export enum ValidationInputTypeInput {
    EMAIL = 'email',
    PASSWORD = 'password',
    DATE = 'date',
    PHONE = 'phone',
    EMAILLIST = 'emailList',
}

export const ValidationInputType = {
    ...ValidationInputTypeInput,
    ...ValidationInputTypeNumber,
    ...ValidationInputTypeText,
};

export const VALIDATION_MESSAGES = {
    //#region VALIDATION RULE MSG
    isRequired: __('This field is required!'),
    match: __('Incorrect input!'),
    range: __('Value is out of range!'), // Range values are also in Validator.js as they require args
    group: __('Field contains issues!'),
    fileExtension: __('Incorrect File extension upload!'),
    //#endregion

    //#region VALIDATION RULE MSG
    [ValidationInputType.ALPHA]: __('Incorrect input! Only letters allowed!'),
    [ValidationInputType.ALPHASPACE]: __('Incorrect input! Only words allowed!'),
    [ValidationInputType.ALPHANUMERIC]: __('Incorrect input! Alpha-Numeric value required!'),
    [ValidationInputType.ALPHADASH]: __('Incorrect input! Alpha-Dash value required!'),
    [ValidationInputType.URL]: __('Incorrect input! URL required!'),
    [ValidationInputType.NUMERIC]: __('Incorrect input! Numeric value required!'),
    [ValidationInputType.NUMERICDASH]: __('Incorrect input! Numeric-Dash value required!'),
    [ValidationInputType.INTEGER]: __('Incorrect input! Integer required!'),
    [ValidationInputType.NATURAL]: __('Incorrect input! Natural number required!'),
    [ValidationInputType.NATURALNOZERO]: __('Incorrect input!'),
    [ValidationInputType.EMAIL]: __('Incorrect email format!'),
    [ValidationInputType.EMAILLIST]: __('Incorrect list of emails!'),
    [ValidationInputType.DATE]: __('Incorrect date input!'),
    [ValidationInputType.PASSWORD]: __('Incorrect password input!'),
    [ValidationInputType.PHONE]: __('Incorrect phone input!'),
    //#endregion
};

export const VALIDATION_RULES = {
    // Text
    [ValidationInputType.ALPHA]: /^[a-z]+$/i,
    [ValidationInputType.ALPHASPACE]: /^[a-z\s]+$/i,
    [ValidationInputType.ALPHANUMERIC]: /^[a-z0-9]+$/i,
    [ValidationInputType.ALPHADASH]: /^[a-z0-9_\\-]+$/i,
    [ValidationInputType.URL]: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?$/,

    // Numbers
    [ValidationInputType.NUMERIC]: /^[0-9]+$/,
    [ValidationInputType.NUMERICDASH]: /^[\d\-\s]+$/,
    [ValidationInputType.INTEGER]: /^\\-?[0-9]+$/,
    [ValidationInputType.DECIMAL]: /^\\-?[0-9]*\.?[0-9]+$/,
    [ValidationInputType.NATURAL]: /^[0-9]+$/i,
    [ValidationInputType.NATURALNOZERO]: /^[1-9][0-9]*$/i,

    // Inputs
    // eslint-disable-next-line max-len
    [ValidationInputType.EMAIL]: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z0-9]{2,}))$/,
    [ValidationInputType.DATE]: /\d{4}-\d{1,2}-\d{1,2}/,
    [ValidationInputType.PHONE]: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
    // eslint-disable-next-line max-len
    [ValidationInputType.EMAILLIST]: /^(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5}){1,25})+([,\s]+(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/,
};
