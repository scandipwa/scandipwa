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
import TextPlaceholder from 'Component/TextPlaceholder';

/**
 * @class ProductReviewRating
 */
class ProductReviewRating extends Component {
    render() {
        const { content } = this.props;

        return (
            <TextPlaceholder content={ content } length="short" />
        );
    }
}

export default ProductReviewRating;
