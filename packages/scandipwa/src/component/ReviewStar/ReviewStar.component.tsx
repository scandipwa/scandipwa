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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import { ReviewStarComponentProps } from './ReviewStar.type';

import './ReviewStar.style';

/** @namespace Component/ReviewStar/Component */
export class ReviewStarComponent extends PureComponent<ReviewStarComponentProps> {
    __construct(props: ReviewStarComponentProps): void {
        super.__construct?.(props);

        this.onStarRatingClick = this.onStarRatingClick.bind(this);
    }

    onStarRatingClick(): void {
        const {
            rating_id,
            option_id,
            onStarRatingClick,
        } = this.props;

        onStarRatingClick(rating_id, option_id);
    }

    render(): ReactElement {
        const {
            name,
            value,
            title,
            isChecked,
            rating_id,
            option_id,
        } = this.props;

        return (
            <input
              block="ReviewStar"
              type="radio"
              id={ option_id + rating_id }
              name={ name }
              value={ value }
              title={ title }
              checked={ isChecked }
              onChange={ this.onStarRatingClick }
              key={ option_id }
            />
        );
    }
}

export default ReviewStarComponent;
