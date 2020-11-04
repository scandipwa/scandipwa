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

import { ChildrenType } from 'Type/Common';

import CarouselScrollItem from './CarouselScrollItem.component';

/** @namespace Component/CarouselScrollItem/Container */
export class CarouselScrollItemContainer extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool,
        itemRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        onClick: PropTypes.func,
        children: ChildrenType,
        position: PropTypes.number.isRequired
    };

    static defaultProps = {
        isActive: false,
        itemRef: () => {},
        onClick: () => {},
        children: []
    };

    containerFunctions = {
        onClick: this.onClick.bind(this)
    };

    containerProps = () => {
        const {
            isActive,
            itemRef,
            children
        } = this.props;

        return {
            isActive,
            itemRef,
            children
        };
    };

    onClick() {
        const { onClick, position } = this.props;
        onClick(position);
    }

    render() {
        return (
            <CarouselScrollItem
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default CarouselScrollItemContainer;
