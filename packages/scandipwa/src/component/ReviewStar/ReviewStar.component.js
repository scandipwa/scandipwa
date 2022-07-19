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

import './ReviewStar.style';

/** @namespace Component/ReviewStar/Component */
export class ReviewStar extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
        option_id: PropTypes.string.isRequired,
        rating_id: PropTypes.string.isRequired,
        onStarRatingClick: PropTypes.func.isRequired
    };

    onStarRatingClick = this.onStarRatingClick.bind(this);

    onStarRatingClick() {
        const {
            rating_id,
            option_id,
            onStarRatingClick
        } = this.props;

        onStarRatingClick(rating_id, option_id);
    }

    render() {
        const {
            name,
            value,
            title,
            isChecked,
            rating_id,
            option_id
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

export default ReviewStar;
