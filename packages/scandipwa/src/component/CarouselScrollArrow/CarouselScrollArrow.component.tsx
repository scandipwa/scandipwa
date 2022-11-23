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
import Button from 'Src/ui-library/Button';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { CarouselScrollArrowComponentProps } from './CarouselScrollArrow.type';

import './CarouselScrollArrow.style';

/** @namespace Component/CarouselScrollArrow/Component */
export class CarouselScrollArrowComponent extends PureComponent<CarouselScrollArrowComponentProps> {
    static defaultProps: Partial<CarouselScrollArrowComponentProps> = {
        mods: {},
        onClick: noopFn,
    };

    render(): ReactElement {
        const { mods, onClick } = this.props;

        return (
            <Button
              mix={ { block: 'CarouselScrollArrow', mods } }
              events={ { onClick } }
              aria-label="Arrow"
            >
                <ChevronIcon />
            </Button>
        );
    }
}

export default CarouselScrollArrowComponent;
