/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface ReviewRatingValue {
    option_id: string;
    value: string;
}

export interface ReviewRatingItem {
    rating_id: number;
    rating_code: string;
    rating_options: ReviewRatingValue[];
}

export interface CreateProductReviewOutput {
    review: {
        nickname: string;
    };
}
