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

import './CarouselScrollArrow.style';

/** @namespace Component/CarouselScrollArrow/Component */
export class CarouselScrollArrow extends PureComponent {
    static propTypes = {
        mods: PropTypes.object,
        onClick: PropTypes.func
    };

    static defaultProps = {
        mods: {},
        onClick: () => {}
    };

    render() {
        const { mods, onClick } = this.props;

        return (
            <button
              block="CarouselScrollArrow"
              mods={ mods }
              onClick={ onClick }
              aria-label="Arrow"
            />
        );
    }
}

export default CarouselScrollArrow;
