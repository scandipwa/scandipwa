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

import { createRef, PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import CarouselScrollItem from './CarouselScrollItem.component';
import {
    CarouselScrollItemComponentContainerPropKeys,
    CarouselScrollItemComponentProps,
    CarouselScrollItemContainerProps,
} from './CarouselScrollItem.type';

/** @namespace Component/CarouselScrollItem/Container */
export class CarouselScrollItemContainer extends PureComponent<CarouselScrollItemContainerProps> {
    static defaultProps: Partial<CarouselScrollItemContainerProps> = {
        isActive: false,
        itemRef: createRef<HTMLDivElement>(),
        onClick: noopFn,
        children: [],
    };

    containerFunctions = {
        onClick: this.onClick.bind(this),
    };

    containerProps(): Pick<CarouselScrollItemComponentProps, CarouselScrollItemComponentContainerPropKeys> {
        const {
            isActive,
            itemRef,
            children,
        } = this.props;

        return {
            isActive,
            itemRef,
            children,
        };
    }

    onClick(): void {
        const { onClick, position } = this.props;

        onClick(position);
    }

    render(): ReactElement {
        return (
            <CarouselScrollItem
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default CarouselScrollItemContainer;
