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

export const VALIDATION_INPUT_TYPE_TEXT = {
    alpha: 'alpha',
    alphaSpace: 'alphaSpace',
    alphaNumeric: 'alphaNumeric',
    alphaDash: 'alphaDash',
    url: 'url'
};

export const VALIDATION_INPUT_TYPE_NUMBER = {
    numeric: 'numeric',
    numericDash: 'numericDash',
    integer: 'integer',
    decimal: 'decimal',
    natural: 'natural',
    naturalNoZero: 'naturalNoZero'
};

export const VALIDATION_INPUT_TYPE_INPUT = {
    email: 'email',
    password: 'password',
    date: 'date',
    phone: 'phone',
    emailList: 'emailList'
};

export const VALIDATION_INPUT_TYPE = {
    ...VALIDATION_INPUT_TYPE_TEXT,
    ...VALIDATION_INPUT_TYPE_NUMBER,
    ...VALIDATION_INPUT_TYPE_INPUT
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
    [VALIDATION_INPUT_TYPE.alpha]: __('Incorrect input! Only letters allowed!'),
    [VALIDATION_INPUT_TYPE.alphaSpace]: __('Incorrect input! Only words allowed!'),
    [VALIDATION_INPUT_TYPE.alphaNumeric]: __('Incorrect input! Alpha-Numeric value required!'),
    [VALIDATION_INPUT_TYPE.alphaDash]: __('Incorrect input! Alpha-Dash value required!'),
    [VALIDATION_INPUT_TYPE.url]: __('Incorrect input! URL required!'),
    [VALIDATION_INPUT_TYPE.numeric]: __('Incorrect input! Numeric value required!'),
    [VALIDATION_INPUT_TYPE.numericDash]: __('Incorrect input! Numeric-Dash value required!'),
    [VALIDATION_INPUT_TYPE.integer]: __('Incorrect input! Integer required!'),
    [VALIDATION_INPUT_TYPE.natural]: __('Incorrect input! Natural number required!'),
    [VALIDATION_INPUT_TYPE.naturalNoZero]: __('Incorrect input!'),
    [VALIDATION_INPUT_TYPE.email]: __('Incorrect email format!'),
    [VALIDATION_INPUT_TYPE.emailList]: __('Incorrect list of emails!'),
    [VALIDATION_INPUT_TYPE.date]: __('Incorrect date input!'),
    [VALIDATION_INPUT_TYPE.password]: __('Incorrect password input!'),
    [VALIDATION_INPUT_TYPE.phone]: __('Incorrect phone input!')
    //#endregion
};

export const VALIDATION_RULES = {
    // Text
    [VALIDATION_INPUT_TYPE.alpha]: /^[a-z]+$/i,
    [VALIDATION_INPUT_TYPE.alphaSpace]: /^[a-z\s]+$/i,
    [VALIDATION_INPUT_TYPE.alphaNumeric]: /^[a-z0-9]+$/i,
    [VALIDATION_INPUT_TYPE.alphaDash]: /^[a-z0-9_\\-]+$/i,
    [VALIDATION_INPUT_TYPE.url]: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?$/,

    // Numbers
    [VALIDATION_INPUT_TYPE.numeric]: /^[0-9]+$/,
    [VALIDATION_INPUT_TYPE.numericDash]: /^[\d\-\s]+$/,
    [VALIDATION_INPUT_TYPE.integer]: /^\\-?[0-9]+$/,
    [VALIDATION_INPUT_TYPE.decimal]: /^\\-?[0-9]*\.?[0-9]+$/,
    [VALIDATION_INPUT_TYPE.natural]: /^[0-9]+$/i,
    [VALIDATION_INPUT_TYPE.naturalNoZero]: /^[1-9][0-9]*$/i,

    // Inputs
    // eslint-disable-next-line max-len
    [VALIDATION_INPUT_TYPE.email]: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z0-9]{2,}))$/,
    [VALIDATION_INPUT_TYPE.date]: /\d{4}-\d{1,2}-\d{1,2}/,
    [VALIDATION_INPUT_TYPE.phone]: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
    // eslint-disable-next-line max-len
    [VALIDATION_INPUT_TYPE.emailList]: /^(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5}){1,25})+([,\s]+(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/
};
