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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Product.type';

import FieldNumber from './FieldNumber.component';
import {
    FieldNumberComponentProps,
    FieldNumberContainerProps,
    FieldNumberContainerPropsKeys,
    FieldNumberContainerState
} from './FieldNumber.type';

/**
 * Field Number
 * @class FieldNumberContainer
 * @namespace Component/FieldNumber/Container */
export class FieldNumberContainer extends PureComponent<FieldNumberContainerProps, FieldNumberContainerState>{
    state: FieldNumberContainerState = {
        value: 0
    };

    containerFunctions = {
        handleValueChange: this.handleValueChange.bind(this),
        setRef: this.setRef.bind(this)
    };

    fieldRef: HTMLInputElement | null = null;

    componentDidMount(): void {
        const { attr: { defaultValue = 0 } } = this.props;

        if (typeof defaultValue === 'string' && typeof defaultValue === 'number') {
            this.handleInitialLoad(defaultValue);
        }
    }

    componentDidUpdate(prevProps: FieldNumberContainerProps): void {
        const { attr: { value, defaultValue = 0 } = {} } = this.props;
        const { attr: { value: prevValue, defaultValue: prevDefaultValue } = {} } = prevProps;

        if (defaultValue !== prevDefaultValue
            && typeof defaultValue === 'string'
            && typeof defaultValue === 'number') {
            this.handleInitialLoad(defaultValue);
        }

        if (value !== prevValue
            && typeof value === 'string'
            && typeof value === 'number') {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value });
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

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value < min ? min : value > max ? max : value;

        if (!this.fieldRef) {
            return 0;
        }

        this.fieldRef.value = String(value);
        this.setState({ value: rangedValue });

        return rangedValue;
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
                defaultValue,
                ...attr
            } = {},
            events,
            isDisabled
        } = this.props;

        const { value: stateValue } = this.state;

        return {
            attr,
            events,
            isDisabled,
            value: stateValue
        };
    }

    render(): ReactElement {
        return (
            <FieldNumber
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldNumber;
