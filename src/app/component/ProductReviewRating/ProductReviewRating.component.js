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

import React, { Component } from 'react';
import './ProductReviewRating.style'

/**
 * @class ProductReviewRating
 */
class ProductReviewRating extends Component {
    render() {
        const { summary } = this.props;
        const clip = `polygon(0 0, 0 100%, ${ summary }% 100%, ${ summary }% 0)`;

        return (
            <div block="ProductReviewRating" title={ summary + '%' }>
                <div block="ProductReviewRating" elem="RatingStars">
                    <i class="star"></i>
                    <i class="star"></i>
                    <i class="star"></i>
                    <i class="star"></i>
                    <i class="star"></i>
                </div>
                <div block="ProductReviewRating" elem="RatingStars" mods={{ filled: true }} style={{ clipPath: clip }}>
                    <i class="star"></i>
                    <i class="star"></i>
                    <i class="star"></i>
                    <i class="star"></i>
                    <i class="star"></i>
                </div>
            </div>
        );
    }
}

export default ProductReviewRating;
