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
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ChildrenType, RefType } from 'Type/Common.type';

import './CarouselScrollItem.style';

/** @namespace Component/CarouselScrollItem/Component */
export class CarouselScrollItem extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        itemRef: RefType.isRequired,
        onClick: PropTypes.func.isRequired,
        children: ChildrenType.isRequired
    };

    render() {
        const {
            isActive,
            itemRef,
            onClick,
            children
        } = this.props;

        return (
            <div
              role="button"
              tabIndex={ 0 }
              block="CarouselScrollItem"
              mods={ { isActive } }
              ref={ itemRef }
              onClick={ onClick }
              onKeyDown={ onClick }
            >
                { children }
            </div>
        );
    }
}

export default CarouselScrollItem;
