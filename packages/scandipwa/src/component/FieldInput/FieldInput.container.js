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

import { PropTypes } from 'prop-types';
import { PureComponent } from 'react';

import FieldInput from './FieldInput.component';

/** @namespace Component/FieldInput/Container */
export class FieldInputContainer extends PureComponent {
    static propTypes = {
        isDisabled: PropTypes.bool,
        autocomplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        type: PropTypes.string.isRequired,
        skipValue: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        ariaLabel: PropTypes.string
    };

    static defaultProps = {
        value: '',
        autocomplete: 'off',
        isDisabled: false,
        skipValue: false,
        ariaLabel: ''
    };

    getAutocomplete() {
        const { autocomplete, type } = this.props;

        /**
         * Make sure password auto-complete is enabled
         */
        if (type === 'password' && autocomplete === 'off') {
            return 'current-password';
        }

        return autocomplete;
    }

    containerProps() {
        const {
            /* eslint-disable react/prop-types */
            dispatch,
            selectOptions,
            isControlled,
            handleChange,
            onChangeCheckbox,
            onKeyEnterDown,
            formRefMap,
            validationStatus,
            subLabel,
            fileExtensions,
            customValidationStatus,
            isLabelWithArrow,

            // Props to be transformed
            isDisabled: disabled,
            autocomplete,
            skipValue,
            ariaLabel,

            // Props that are passed correctly from the beginning
            ...validProps
        } = this.props;

        const ariaLabelProp = ariaLabel ? { 'aria-label': ariaLabel } : {};

        return {
            ...validProps,
            ...ariaLabelProp,
            disabled,
            'data-skip-value': skipValue,
            autoComplete: this.getAutocomplete()
        };
    }

    render() {
        return (
            <FieldInput { ...this.containerProps() } />
        );
    }
}

export default FieldInputContainer;
