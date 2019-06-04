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
            'percentage',
            `${summary}%`
        );
    }

    getAriaText(summary, code) {
        const rating = Math.round((summary / 20) * 100) / 100;

        return code
            ? `Review's ${code} rating is ${rating} out of 5`
            : `Product's rating is ${rating} out of 5`;
    }

    render() {
        const { summary, code } = this.props;
        const ariaText = this.getAriaText(summary, code);

        return (
            <div
              block="ProductReviewRating"
              title={ `${summary}%` }
              ref={ this.reviewRating }
              aria-label={ ariaText }
            />
        );
    }
}

ProductReviewRating.propTypes = {
    summary: PropTypes.number.isRequired,
    code: PropTypes.string
};

ProductReviewRating.defaultProps = {
    code: ''
};

export default ProductReviewRating;
