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
import PropTypes from 'prop-types';
import CSS from 'Util/CSS';
import './ProductReviewRating.style';

/**
 * @class ProductReviewRating
 */
class ProductReviewRating extends Component {
    constructor(props) {
        super(props);
        this.reviewRating = React.createRef();
    }

    componentDidMount() {
        const { summary } = this.props;

        CSS.setVariable(
            this.reviewRating,
            'clip-percentage',
            `${summary}%`
        );
    }

    render() {
        const { summary } = this.props;

        return (
            <div block="ProductReviewRating" title={ `${summary}%` }>
                <div block="ProductReviewRating" elem="RatingStars">
                    <i className="star" />
                    <i className="star" />
                    <i className="star" />
                    <i className="star" />
                    <i className="star" />
                </div>
                <div
                  block="ProductReviewRating"
                  elem="RatingStars"
                  mods={ { filled: true } }
                  ref={ this.reviewRating }
                >
                    <i className="star" />
                    <i className="star" />
                    <i className="star" />
                    <i className="star" />
                    <i className="star" />
                </div>
            </div>
        );
    }
}

ProductReviewRating.propTypes = {
    summary: PropTypes.number.isRequired
};

export default ProductReviewRating;
