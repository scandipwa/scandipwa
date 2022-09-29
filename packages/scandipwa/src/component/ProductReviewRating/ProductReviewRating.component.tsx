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

import { createRef, PureComponent } from 'react';

import {
    ONE_STAR_SHARE,
    STARS_COUNT,
    STARS_GRANULARITY_PERCENT,
} from 'Component/ProductReviewRating/ProductReviewRating.config';
import Star from 'Component/StarIcon';
import { StartFill } from 'Component/StarIcon/StarIcon.config';
import { ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';

import { ProductReviewRatingComponentProps } from './ProductReviewRating.type';

import './ProductReviewRating.style';

/**
 * @class ProductReviewRating
 * @namespace Component/ProductReviewRating/Component
 */
export class ProductReviewRating extends PureComponent<ProductReviewRatingComponentProps> {
    static defaultProps: Partial<ProductReviewRatingComponentProps> = {
        summary: 0,
        code: '',
        placeholder: false,
        mix: {},
        count: 0,
    };

    reviewRating = createRef<HTMLDivElement>();

    componentDidMount(): void {
        this.updateRating();
    }

    componentDidUpdate(): void {
        this.updateRating();
    }

    getAriaText(summary: number, code: string): string {
        const ONE_FIFTH_OF_A_HUNDRED = 20;
        const rating = parseFloat(String(summary / ONE_FIFTH_OF_A_HUNDRED)).toFixed(2);

        return code
            ? `Review's ${code} rating is ${rating} out of 5`
            : `Product's rating is ${rating} out of 5`;
    }

    updateRating(): void {
        const { summary } = this.props;

        CSS.setVariable(
            this.reviewRating,
            'percentage',
            `${summary}%`,
        );
    }

    renderPlaceholder(): ReactElement {
        return (
            <div
              block="ProductReviewRating"
              ref={ this.reviewRating }
            />
        );
    }

    getStarCounts(): number[] {
        const { summary } = this.props;
        const percentRounded = Math.round(summary / STARS_GRANULARITY_PERCENT) * STARS_GRANULARITY_PERCENT;
        const fullCount = Math.floor(percentRounded / ONE_STAR_SHARE);
        const halfFullCount = percentRounded % ONE_STAR_SHARE === STARS_GRANULARITY_PERCENT ? 1 : 0;
        const emptyCount = STARS_COUNT - fullCount - halfFullCount;

        return [fullCount, halfFullCount, emptyCount];
    }

    renderStar(count: number, type: StartFill): ReactElement {
        return Array.from(Array(count), (_, i) => <Star key={ i } starFill={ type } />);
    }

    render(): ReactElement {
        const {
            summary,
            code,
            placeholder,
            mix,
            count,
        } = this.props;

        const [fullCount, halfFullCount, emptyCount] = this.getStarCounts();

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
            >
                { this.renderStar(fullCount, StartFill.FULL) }
                { this.renderStar(halfFullCount, StartFill.HALF_FULL) }
                { this.renderStar(emptyCount, StartFill.EMPTY) }
                <span block="ProductReviewRating" elem="Counter">
                    { `(${count})` }
                </span>
            </div>
        );
    }
}

export default ProductReviewRating;
