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

import CarouselScrollArrow from './CarouselScrollArrow.component';
import {
    CarouselScrollArrowComponentContainerPropKeys,
    CarouselScrollArrowComponentProps,
    CarouselScrollArrowContainerProps,
} from './CarouselScrollArrow.type';

/** @namespace Component/CarouselScrollArrow/Container */
export class CarouselScrollArrowContainer extends PureComponent<CarouselScrollArrowContainerProps> {
    containerFunctions = {
        onClick: this.onClick.bind(this),
    };

    containerProps(): Pick<CarouselScrollArrowComponentProps, CarouselScrollArrowComponentContainerPropKeys> {
        const { isNextArrow, isInvisible } = this.props;

        return {
            mods: {
                isNextArrow,
                isInvisible,
            },
        };
    }

    onClick(): void {
        const { onClick, isNextArrow } = this.props;

        onClick(isNextArrow);
    }

    render(): ReactElement {
        return (
            <CarouselScrollArrow
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default CarouselScrollArrowContainer;
