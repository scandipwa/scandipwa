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
import { PureComponent } from 'react';

import { ChildrenType, ModsType } from 'Type/Common.type';
import { EventsType, FieldAttrType } from 'Type/Field.type';

import './FieldGroup.style';

/**
 * Field Group
 * @class FieldGroup
 * @namespace Component/FieldGroup/Component */
export class FieldGroup extends PureComponent {
    static propTypes = {
        // Group attributes
        children: ChildrenType.isRequired,
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        setRef: PropTypes.func.isRequired,

        // Validation
        showErrorAsLabel: PropTypes.bool.isRequired,
        validationResponse: PropTypes.oneOfType([
            PropTypes.shape({ errorMessages: PropTypes.string }),
            PropTypes.bool
        ]),

        // Labels
        label: PropTypes.string.isRequired,
        subLabel: PropTypes.string.isRequired,

        mods: ModsType.isRequired
    };

    static defaultProps = {
        validationResponse: null
    };

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under group
    renderErrorMessage(message) {
        return <div block="Field" elem="ErrorMessage">{ message }</div>;
    }

    renderErrorMessages() {
        const {
            showErrorAsLabel,
            validationResponse
        } = this.props;

        if (!showErrorAsLabel || !validationResponse || validationResponse === true) {
            return null;
        }

        const { errorMessages } = validationResponse;

        if (!errorMessages) {
            return null;
        }

        return (
            <div block="FieldGroup" elem="ErrorMessages">
                { errorMessages.map(this.renderErrorMessage.bind(this)) }
            </div>
        );
    }

    // Renders group label above field
    renderLabel() {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return (
            { label }
        );
    }

    // Renders group label under field
    renderSubLabel() {
        const { subLabel } = this.props;

        if (!subLabel) {
            return null;
        }

        return (
            { subLabel }
        );
    }
    //#endregion

    render() {
        const {
            validationResponse,
            children,
            setRef,
            attr,
            events,
            mods
        } = this.props;

        return (
            <div block="FieldGroup" elem="Wrapper" mods={ mods }>
                { this.renderLabel() }
                <div
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...events }
                  ref={ (elem) => setRef(elem) }
                  block="FieldGroup"
                  mods={ {
                      isValid: validationResponse === true,
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0
                  } }
                >
                    { children }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}

export default FieldGroup;
