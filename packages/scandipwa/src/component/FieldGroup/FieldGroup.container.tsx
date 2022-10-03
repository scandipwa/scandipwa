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

import { PureComponent, SyntheticEvent } from 'react';

import { FieldType } from 'Component/Field/Field.config';
import { FormValidationOutput } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';
import getFieldsData from 'Util/Form/Extract';
import { validateGroup } from 'Util/Validator';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

import FieldGroup from './FieldGroup.component';
import {
    FieldGroupComponentProps,
    FieldGroupContainerFunctions,
    FieldGroupContainerProps,
    FieldGroupContainerPropsKeys,
    FieldGroupContainerState,
    FieldGroupEvents,
} from './FieldGroup.type';

/**
 * Field Group
 * @class FieldGroupContainer
 * @namespace Component/FieldGroup/Container */
export class FieldGroupContainer extends PureComponent<FieldGroupContainerProps, FieldGroupContainerState> {
    static defaultProps: Partial<FieldGroupContainerProps> = {
        attr: {},
        events: {} as FieldGroupEvents,
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        children: [],
        mods: {},
        elemRef: undefined,
        returnAsObject: false,
    };

    state: FieldGroupContainerState = {
        validationResponse: null,
    };

    containerFunctions: FieldGroupContainerFunctions = {
        validate: this.validate.bind(this),
    };

    groupRef: HTMLDivElement | null = null;

    // #region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount(): void {
        const { validationRule } = this.props;

        if (this.groupRef && validationRule && Object.keys(validationRule).length > 0) {
            this.groupRef.removeEventListener('validate', this.validate.bind(this));
        }
    }

    // Adds validation event listener to field
    setRef(elem: HTMLDivElement | null): void {
        const { validationRule, elemRef } = this.props;

        if (elem && this.groupRef !== elem) {
            this.groupRef = elem;

            if (elemRef) {
                elemRef.current = elem;
            }

            if (!validationRule || Object.keys(validationRule).length === 0) {
                return;
            }
            elem.addEventListener('validate', this.validate.bind(this));
        }
    }

    validate(data?: (Event | SyntheticEvent) & FormValidationOutput): boolean | ValidationDOMOutput | null {
        const { validationRule } = this.props;
        const output = this.groupRef && validateGroup(this.groupRef, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output && output !== true) {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }
        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook: unknown, ...args: ((event?: SyntheticEvent) => void)[]): void{
        this.validate();

        if (typeof hook === 'function') {
            this.surroundEvent(hook, ...args);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    surroundEvent(hook: any, ...args: ((event?: SyntheticEvent) => void)[]): void {
        const { attr } = this.props;
        const fields = getFieldsData(
            this.groupRef,
            false,
            [FieldType.NUMBER_WITH_CONTROLS, FieldType.BUTTON],
        );

        hook(...[...args, { ...attr, formRef: this.groupRef, fields }]);
    }
    // #endregion

    containerProps(): Pick<FieldGroupComponentProps, FieldGroupContainerPropsKeys> {
        const {
            events,
            validateOn,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mods,
        } = this.props;
        const { validate } = this.containerFunctions;
        const { validationResponse } = this.state;

        // Surrounds events with validation
        const newEvents: FieldGroupEvents = {} as FieldGroupEvents;

        (Object.keys(events) as Array<keyof FieldGroupEvents>).forEach((eventName) => {
            const { [ eventName as keyof FieldGroupEvents]: event } = events;

            newEvents[eventName] = this.surroundEvent.bind(this, event) as any;
        });

        (validateOn as Array<keyof FieldGroupEvents>).forEach((eventName) => {
            const { [ eventName as keyof typeof events ]: baseEvent } = events;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newEvents[ eventName ] = (baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate) as any;
        });

        return {
            validationResponse,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mods,
            events: newEvents,
            setRef: this.setRef.bind(this),
        };
    }

    render(): ReactElement {
        return (
            <FieldGroup
              { ...this.containerProps() }
            />
        );
    }
}

export default FieldGroupContainer;
