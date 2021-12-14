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

import { ChildrenType, MixType } from 'Type/Common.type';
import { EventsType, FieldAttrType } from 'Type/Field.type';

/**
 * Form
 * @class Form
 * @namespace Component/Form/Component */
export class Form extends PureComponent {
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

        mix: MixType.isRequired
    };

    static defaultProps = {
        validationResponse: null
    };

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under form
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
            <div block="Form" elem="ErrorMessages">
                { errorMessages.map(this.renderErrorMessage.bind(this)) }
            </div>
        );
    }

    // Renders group label above form
    renderLabel() {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return (
            { label }
        );
    }

    // Renders group label under form
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
            mix
        } = this.props;

        return (
            <>
                { this.renderLabel() }
                <form
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...events }
                  ref={ (elem) => setRef(elem) }
                  block="Form"
                  mix={ mix }
                  mods={ {
                      isValid: validationResponse === true,
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0
                  } }
                  noValidate
                >
                    { children }
                </form>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </>
        );
    }
}

export default Form;
