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
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification/Notification.action';
import { DeviceType } from 'Type/Device.type';
import { ProductType } from 'Type/ProductList.type';
import { RatingItemsType } from 'Type/Rating.type';

import ProductReviews from './ProductReviews.component';

/** @namespace Component/ProductReviews/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest,
    device: state.ConfigReducer.device,
    reviewRatings: state.ConfigReducer.reviewRatings
});

/** @namespace Component/ProductReviews/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showInfoNotification: (message) => dispatch(showNotification('info', message))
});

/** @namespace Component/ProductReviews/Container */
export class ProductReviewsContainer extends PureComponent {
    static propTypes = {
        showInfoNotification: PropTypes.func.isRequired,
        isGuestEnabled: PropTypes.bool,
        isEnabled: PropTypes.bool,
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool,
        device: DeviceType.isRequired,
        reviewRatings: RatingItemsType.isRequired
    };

    static defaultProps = {
        isEnabled: true,
        isGuestEnabled: true,
        areDetailsLoaded: false
    };

    allReviewsHaveAllRatings() {
        const {
            product: {
                reviews
            },
            reviewRatings
        } = this.props;

        const ratingVotes = {};

        reviews.forEach(({ rating_votes }) => {
            rating_votes.forEach(({ rating_code }) => {
                if (ratingVotes[rating_code]) {
                    ratingVotes[rating_code]++;
                } else {
                    ratingVotes[rating_code] = 1;
                }
            });
        });

        if (reviewRatings.length !== Object.keys(ratingVotes).length) {
            return false;
        }

        // eslint-disable-next-line fp/no-let
        let allRatingsPresent = true;

        reviewRatings.forEach(({ rating_code }) => {
            if (ratingVotes[rating_code] !== reviews.length) {
                allRatingsPresent = false;
            }
        });

        return allRatingsPresent;
    }

    containerProps() {
        const {
            areDetailsLoaded,
            device,
            isEnabled,
            product,
            reviewRatings
        } = this.props;

        return {
            areDetailsLoaded,
            device,
            isEnabled,
            product,
            reviewRatings,
            allReviewsHaveAllRatings: this.allReviewsHaveAllRatings()
        };
    }

    render() {
        const { isEnabled } = this.props;

        if (!isEnabled) {
            return null;
        }

        return (
            <ProductReviews
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewsContainer);
