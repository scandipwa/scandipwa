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
import { createRef, PureComponent } from 'react';

import { MixType } from 'Type/Common';
import CSS from 'Util/CSS';

import './ProductReviewRating.style';

/**
 * @class ProductReviewRating
 * @namespace Component/ProductReviewRating/Component
 */
export class ProductReviewRating extends PureComponent {
    static propTypes = {
        summary: PropTypes.number,
        code: PropTypes.string,
        placeholder: PropTypes.bool,
        mix: MixType
    };

    static defaultProps = {
        summary: 0,
        code: '',
        placeholder: false,
        mix: {}
    };

    reviewRating = createRef();

    componentDidMount() {
        this.updateRating();
    }

    componentDidUpdate() {
        this.updateRating();
    }

    getAriaText(summary, code) {
        const ONE_FIFTH_OF_A_HUNDRED = 20;
        const rating = parseFloat(summary / ONE_FIFTH_OF_A_HUNDRED).toFixed(2);

        return code
            ? `Review's ${code} rating is ${rating} out of 5`
            : `Product's rating is ${rating} out of 5`;
    }

    updateRating() {
        const { summary } = this.props;

        CSS.setVariable(
            this.reviewRating,
            'percentage',
            `${summary}%`
        );
    }

    renderPlaceholder() {
        return (
            <div
              block="ProductReviewRating"
              ref={ this.reviewRating }
            />
        );
    }

    render() {
        const {
            summary,
            code,
            placeholder,
            mix
        } = this.props;

        const ariaText = this.getAriaText(summary, code);

        if (placeholder) {
            return this.renderPlaceholder();
        }

        return (
            <div
              block="ProductReviewRating"
              title={ `${summary}%` }
              ref={ this.reviewRating }
              aria-label={ ariaText }
              mix={ mix }
            />
        );
    }
}

export default ProductReviewRating;
