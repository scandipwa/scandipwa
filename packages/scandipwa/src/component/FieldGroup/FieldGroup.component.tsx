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

import { FieldGroupComponentProps } from './FieldGroup.type';

import './FieldGroup.style';

/**
 * Field Group
 * @class FieldGroup
 * @namespace Component/FieldGroup/Component */
export class FieldGroupComponent<
P extends Readonly<FieldGroupComponentProps> = Readonly<FieldGroupComponentProps>,
S extends FieldGroupComponentState = FieldGroupComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<FieldGroupComponentProps> = {
        validationResponse: null,
    };

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under group
    renderErrorMessage(message: string): ReactElement {
        return <div block="Field" key={ message } elem="ErrorMessage">{ message }</div>;
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
            <div block="FieldGroup" elem="ErrorMessages">
                { errorMessages.map(this.renderErrorMessage.bind(this)) }
            </div>
        );
    }

    // Renders group label above field
    renderLabel(): ReactElement {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return label;
    }

    // Renders group label under field
    renderSubLabel(): ReactElement {
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
            mods,
        } = this.props;

        return (
            <div block="FieldGroup" elem="Wrapper" mods={ mods }>
                { this.renderLabel() }
                <div
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction, @typescript-eslint/no-explicit-any
                  { ...events as any }
                  ref={ (elem) => setRef(elem) }
                  block="FieldGroup"
                  mods={ {
                      isValid: validationResponse === true,
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0,
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

export default FieldGroupComponent;
