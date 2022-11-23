/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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

import { ButtonHTMLAttributes, PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import { ButtonComponentProps, ButtonContainerPropsKey, FieldReactEvents } from './Button.type';

/** @namespace uiLibrary/Button/Container */
export class ButtonContainer extends PureComponent<
ButtonComponentProps
> {
    static defaultProps: Partial<ButtonComponentProps> = {
        mix: {},
    };

    containerProps(): Pick<ButtonComponentProps, ButtonContainerPropsKey> {
        const {
            mix,
        } = this.props;

        return {
            mix,
        };
    }

    render(): ReactElement {
        const { children, attr, events } = this.props;

        return (
            <button
              { ...this.containerProps() }
              { ...attr as ButtonHTMLAttributes<HTMLButtonElement> }
              { ...events as FieldReactEvents<HTMLButtonElement> }
            >
                { children }
            </button>
        );
    }
}

export default ButtonContainer;
