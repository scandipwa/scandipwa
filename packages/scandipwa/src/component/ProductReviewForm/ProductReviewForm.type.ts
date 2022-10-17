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

import { FormFields } from 'Component/Form/Form.type';
import { Customer } from 'Query/MyAccount.type';
import { ReviewRatingItem } from 'Query/Review.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReviewItem } from 'Store/Review/Review.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductReviewFormContainerMapStateProps {
    customer: Partial<Customer>;
    reviewRatings: ReviewRatingItem[];
}

export interface ProductReviewFormContainerMapDispatchProps {
    addReview: (options: ReviewItem) => void;
    showNotification: (type: NotificationType, message: string) => void;
    hideActiveOverlay: () => void;
    goToPreviousHeaderState: () => void;
}

export interface ProductReviewFormContainerBaseProps {
    product: Partial<IndexedProduct>;
}

export interface ProductReviewFormContainerFunctions {
    onReviewSubmitSuccess: (form: HTMLFormElement, fields: FormFields) => Promise<void>;
    onStarRatingClick: (rating_id: string, option_id: string) => void;
    onReviewError: (_: HTMLFormElement, invalidFields: FormFields | null) => void;
}

export type ProductReviewFormContainerProps = ProductReviewFormContainerMapStateProps
& ProductReviewFormContainerMapDispatchProps
& ProductReviewFormContainerBaseProps;

export interface ProductReviewFormContainerState {
    isLoading: boolean;
    ratingData: Record<string, string>;
    reviewData: Partial<ReviewData>;
    isSubmitted: boolean;
}

export interface ProductReviewFormComponentProps {
    isLoading: boolean;
    isSubmitted: boolean;
    ratingData: Record<string, string>;
    reviewData: Partial<ReviewData>;
    reviewRatings: ReviewRatingItem[];
    onReviewSubmitSuccess: (form: HTMLFormElement, fields: FormFields) => Promise<void>;
    onStarRatingClick: (rating_id: string, option_id: string) => void;
    onReviewError: (_: HTMLFormElement, invalidFields: FormFields | null) => void;
}

export type ProductReviewFormComponentContainerPropKeys =
| 'isLoading'
| 'isSubmitted'
| 'ratingData'
| 'reviewData'
| 'reviewRatings';

export interface ReviewData {
    nickname: string;
    summary: string;
    detail: string;
}
