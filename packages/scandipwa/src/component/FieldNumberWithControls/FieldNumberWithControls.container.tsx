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
    FieldNumberWithControlsComponentProps,
    FieldNumberWithControlsContainerFunctions,
    FieldNumberWithControlsContainerProps,
    FieldNumberWithControlsContainerPropsKeys,
    FieldNumberWithControlsContainerState,
} from './FieldNumberWithControls.type';

/**
 * Field Number With Controls
 * @class FieldNumberWithControlsContainer
 * @namespace Component/FieldNumberWithControls/Container */
export class FieldNumberWithControlsContainer<
P extends Readonly<FieldNumberWithControlsContainerProps> = Readonly<FieldNumberWithControlsContainerProps>,
S extends FieldNumberWithControlsContainerState = FieldNumberWithControlsContainerState,
> extends PureComponent<P, S>{
    state: S = {
        value: 0,
    } as S;

    containerFunctions: FieldNumberWithControlsContainerFunctions = {
        handleValueChange: this.handleValueChange.bind(this),
        setRef: this.setRef.bind(this),
    };

    fieldRef: HTMLInputElement | null = null;

    componentDidMount(): void {
        const { attr: { defaultValue = 0 } } = this.props;

        if (typeof defaultValue !== 'object') {
            this.handleInitialLoad(defaultValue);
        }
    }

    componentDidUpdate(prevProps: FieldNumberWithControlsContainerProps): void {
        const { attr: { min = 0, defaultValue = min } = {} } = this.props;
        const { attr: { defaultValue: prevDefaultValue = 0 } = {} } = prevProps;

        if (defaultValue <= 0 || prevDefaultValue <= 0) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value: min });
        }

        if (defaultValue < min || prevDefaultValue < min) {
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

    setValue(value: number | string): number | string | null {
        const {
            attr: { min = 0, max = DEFAULT_MAX_PRODUCTS } = {},
        } = this.props;

        const { value: stateValue } = this.state;

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value <= min ? min : value > max ? max : value;

        if (stateValue >= 0 && this.fieldRef) {
            this.fieldRef.value = String(value);
            this.setState({ value: rangedValue });

            return rangedValue;
        }

        return null;
    }

    handleInitialLoad(value: number | string): void {
        const {
            events: { onLoad } = {},
        } = this.props;

        const newValue = this.setValue(value);

        if (typeof onLoad === 'function') {
            onLoad(Number(newValue));
        }
    }

    handleValueChange(value: number | string): void {
        const {
            events: { onChange } = {},
        } = this.props;

        const newValue = this.setValue(value);

        if (typeof onChange === 'function') {
            onChange(Number(newValue));
        }
    }

    containerProps(): Pick<FieldNumberWithControlsComponentProps, FieldNumberWithControlsContainerPropsKeys> {
        const {
            attr: {
                autoComplete,
                defaultValue,
                ...attr
            } = {},
            value,
            events,
            isDisabled,
        } = this.props;

        const { value: stateValue } = this.state;

        return {
            attr: {
                ...attr,
                autoComplete,
            },
            value,
            events,
            isDisabled,
            stateValue,
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
