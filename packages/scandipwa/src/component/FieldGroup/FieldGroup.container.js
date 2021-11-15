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

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

import FIELD_TYPE from 'Component/Field/Field.config';
import { ChildrenType, ModsType, RefType } from 'Type/Common.type';
import { EventsType, FieldAttrType, ValidationRuleType } from 'Type/Field.type';
import getFieldsData from 'Util/Form/Extract';
import { validateGroup } from 'Util/Validator';

import FieldGroup from './FieldGroup.component';

/**
 * Field Group
 * @class FieldGroupContainer
 * @namespace Component/FieldGroup/Container */
export class FieldGroupContainer extends PureComponent {
    static propTypes = {
        // Group attributes
        children: ChildrenType,
        attr: FieldAttrType,
        events: EventsType,
        elemRef: RefType,

        // Validation
        validationRule: ValidationRuleType,
        validateOn: PropTypes.arrayOf(PropTypes.string),
        showErrorAsLabel: PropTypes.bool,

        // Labels
        label: PropTypes.string,
        subLabel: PropTypes.string,

        mods: ModsType
    };

    static defaultProps = {
        attr: {},
        events: {},
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        children: [],
        mods: {},
        elemRef: null
    };

    state = {
        validationResponse: null
    };

    containerFunctions = {
        validate: this.validate.bind(this)
    };

    groupRef = createRef();

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount() {
        const { validationRule } = this.props;

        if (this.groupRef && validationRule && Object.keys(validationRule).length > 0) {
            this.groupRef.removeEventListener('validate', this.validate.bind(this));
        }
    }

    // Adds validation event listener to field
    setRef(elem) {
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

    validate(data) {
        const { validationRule } = this.props;
        const output = validateGroup(this.groupRef, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output !== true) {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }
        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook, ...args) {
        this.validate();

        if (typeof hook === 'function') {
            this.surroundEvent(hook, ...args);
        }
    }

    surroundEvent(hook, ...args) {
        const { attr } = this.props;
        const fields = getFieldsData(
            this.groupRef,
            false,
            [FIELD_TYPE.number, FIELD_TYPE.button]
        );

        hook(...[...args, { ...attr, formRef: this.groupRef, fields }]);
    }
    //#endregion

    containerProps() {
        const {
            events,
            validateOn,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mods
        } = this.props;
        const { validate } = this.containerFunctions;
        const { validationResponse } = this.state;

        // Surrounds events with validation
        const newEvents = {};
        Object.keys(events).forEach((eventName) => {
            const { [eventName]: event } = events;
            newEvents[eventName] = this.surroundEvent.bind(this, event);
        });

        validateOn.forEach((eventName) => {
            const { [eventName]: baseEvent } = events;
            newEvents[eventName] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
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
            setRef: this.setRef.bind(this)
        };
    }

    render() {
        return (
            <FieldGroup
              { ...this.containerProps() }
            />
        );
    }
}

export default FieldGroupContainer;
