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

import CarouselScrollArrow from './CarouselScrollArrow.component';

/** @namespace Component/CarouselScrollArrow/Container */
export class CarouselScrollArrowContainer extends PureComponent {
    static propTypes = {
        isNextArrow: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    };

    containerFunctions = {
        onClick: this.onClick.bind(this)
    };

    containerProps = () => {
        const { isNextArrow, isDisabled } = this.props;

        return {
            mods: {
                isNextArrow,
                isDisabled
            }
        };
    };

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
