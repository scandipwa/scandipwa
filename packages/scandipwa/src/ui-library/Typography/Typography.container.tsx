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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import Typography from './Typography.component';
import { TypographyContainerProps, TypographyContainerPropsKey } from './Typography.type';
/** @namespace uiLibrary/Typography/Container */
export class TypographyContainer extends PureComponent<
TypographyContainerProps
> {
    static defaultProps: Partial<TypographyContainerProps> = {
        mix: {},
    };

    containerProps(): Pick<TypographyContainerProps, TypographyContainerPropsKey> {
        const {
            mix,
            attr,
            children,
            variant,
            appearance,
        } = this.props;

        return {
            mix,
            attr,
            children,
            variant,
            appearance,
        };
    }

    render(): ReactElement {
        return (
            <Typography
              { ...this.containerProps() }
            />
        );
    }
}

export default TypographyContainer;
