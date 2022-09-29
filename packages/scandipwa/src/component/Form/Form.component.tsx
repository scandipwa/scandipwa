/* eslint-disable spaced-comment */
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

import { FormComponentProps } from './Form.type';

/**
 * Form
 * @class Form
 * @namespace Component/Form/Component */
export class Form extends PureComponent<FormComponentProps> {
    static defaultProps: Partial<FormComponentProps> = {
        validationResponse: null,
    };

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under form
    renderErrorMessage(message: string): ReactElement {
        return <div block="Field" elem="ErrorMessage">{ message }</div>;
    }

    renderErrorMessages(): ReactElement {
        const {
            showErrorAsLabel,
            validationResponse,
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
    renderLabel(): string | null {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return label;
    }

    // Renders group label under form
    renderSubLabel(): string | null {
        const { subLabel } = this.props;

        if (!subLabel) {
            return null;
        }

        return subLabel;
    }
    //#endregion

    render(): ReactElement {
        const {
            validationResponse,
            children,
            setRef,
            attr,
            events,
            mix,
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
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0,
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
