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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Product.type';

import FieldNumberWithControls from './FieldNumberWithControls.component';
import {
    FieldNumberComponentProps,
    FieldNumberContainerFunctions,
    FieldNumberContainerProps,
    FieldNumberContainerPropsKeys,
    FieldNumberContainerState
} from './FieldNumberWithControls.type';

/**
 * Field Number With Controls
 * @class FieldNumberWithControlsContainer
 * @namespace Component/FieldNumberWithControls/Container */
export class FieldNumberContainer extends PureComponent<FieldNumberContainerProps, FieldNumberContainerState>{
    state: FieldNumberContainerState = {
        value: 0
    };

    containerFunctions: FieldNumberContainerFunctions = {
        handleValueChange: this.handleValueChange.bind(this),
        setRef: this.setRef.bind(this)
    };

    fieldRef: HTMLInputElement | null = null;

    componentDidMount(): void {
        const { attr: { defaultValue = 0 } } = this.props;

        this.handleInitialLoad(defaultValue);
    }

    componentDidUpdate(prevProps: FieldNumberContainerProps): void {
        const { attr: { min, defaultValue = min } = {} } = this.props;
        const { attr: { defaultValue: prevDefaultValue } = {} } = prevProps;

        if (defaultValue <= 0 || prevDefaultValue <= 0) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value: min });
        }

        if (defaultValue < min) {
            this.handleInitialLoad(min);
        }
    }

    setRef(elem: HTMLInputElement | null): void {
        const { setRef } = this.props;

        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    setValue(value: number | string): number | string {
        const {
            attr: { min = 0, max = DEFAULT_MAX_PRODUCTS } = {}
        } = this.props;

        const { value: stateValue } = this.state;

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value <= min ? min : value > max ? max : value;

        if (stateValue >= 0) {
            this.fieldRef.value = value;
            this.setState({ value: rangedValue });

            return rangedValue;
        }

        return null;
    }

    handleInitialLoad(value: number | string): void {
        const {
            events: { onLoad } = {}
        } = this.props;

        const newValue = this.setValue(value);

        if (typeof onLoad === 'function') {
            onLoad(Number(newValue));
        }
    }

    handleValueChange(value: number | string): void {
        const {
            events: { onChange } = {}
        } = this.props;

        const newValue = this.setValue(value);

        if (typeof onChange === 'function') {
            onChange(Number(newValue));
        }
    }

    containerProps(): Pick<FieldNumberComponentProps, FieldNumberContainerPropsKeys> {
        const {
            attr: {
                autoComplete,
                autocomplete,
                defaultValue,
                ...attr
            } = {},
            value,
            events,
            isDisabled
        } = this.props;

        const { value: stateValue } = this.state;

        return {
            attr: {
                ...attr,
                autoComplete: autoComplete || autocomplete
            },
            value,
            events,
            isDisabled,
            stateValue
        };
    }

    render(): ReactElement {
        return (
            <FieldNumberWithControls
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldNumberWithControls;
