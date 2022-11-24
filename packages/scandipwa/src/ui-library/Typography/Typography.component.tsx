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

import { HTMLAttributes, PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import { TypographyVariants } from './Typography.config';
import { TypographyComponentProps, TypographyMapVariant } from './Typography.type';

/** @namespace uiLibrary/Typography/Component */
export class TypographyComponent extends PureComponent<
TypographyComponentProps
> {
    variantMap: Record<TypographyVariants, TypographyMapVariant> = {
        [TypographyVariants.H1]: {
            Component: 'h1',
        },
        [TypographyVariants.H2]: {
            Component: 'h2',
        },
        [TypographyVariants.H3]: {
            Component: 'h3',
        },
    };

    renderVariant(): ReactElement {
        const {
            variant, children, mix, attr,
        } = this.props;
        const { Component } = this.variantMap[variant];

        if (Component) {
            return (
                <Component
                  mix={ mix }
                  { ...attr as HTMLAttributes<HTMLElement> }
                >
                  { children }
                </Component>
            );
        }

        return null;
    }

    render(): ReactElement {
        return this.renderVariant();
    }
}

export default TypographyComponent;
