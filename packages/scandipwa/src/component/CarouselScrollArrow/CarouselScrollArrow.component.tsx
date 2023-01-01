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

import ChevronIcon from 'Component/ChevronIcon';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { CarouselScrollArrowComponentProps, CarouselScrollArrowComponentState } from './CarouselScrollArrow.type';

import './CarouselScrollArrow.style';

/** @namespace Component/CarouselScrollArrow/Component */
export class CarouselScrollArrowComponent<
P extends Readonly<CarouselScrollArrowComponentProps> = Readonly<CarouselScrollArrowComponentProps>,
S extends CarouselScrollArrowComponentState = CarouselScrollArrowComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CarouselScrollArrowComponentProps> = {
        mods: {},
        onClick: noopFn,
    };

    render(): ReactElement {
        const { mods, onClick } = this.props;

        return (
            <button
              block="CarouselScrollArrow"
              mods={ mods }
              onClick={ onClick }
              aria-label="Arrow"
            >
                <ChevronIcon />
            </button>
        );
    }
}

export default CarouselScrollArrowComponent;
