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

import CarouselScrollArrow from './CarouselScrollArrow.component';

/** @namespace Component/CarouselScrollArrow/Container */
export class CarouselScrollArrowContainer extends PureComponent {
    static propTypes = {
        isNextArrow: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        isInvisible: PropTypes.bool.isRequired
    };

    containerFunctions = {
        onClick: this.onClick.bind(this)
    };

    containerProps() {
        const { isNextArrow, isInvisible } = this.props;

        return {
            mods: {
                isNextArrow,
                isInvisible
            }
        };
    }

    onClick() {
        const { onClick, isNextArrow } = this.props;

        onClick(isNextArrow);
    }

    render() {
        return (
            <CarouselScrollArrow
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default CarouselScrollArrowContainer;
