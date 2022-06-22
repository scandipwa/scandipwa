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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FormFields } from 'Component/Form/Form.type';
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import { getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import ProductReviewForm from './ProductReviewForm.component';
import {
    ProductReviewFormComponentContainerPropKeys,
    ProductReviewFormComponentProps,
    ProductReviewFormContainerFunctions,
    ProductReviewFormContainerMapDispatchProps,
    ProductReviewFormContainerMapStateProps,
    ProductReviewFormContainerProps,
    ProductReviewFormContainerState
} from './ProductReviewForm.type';

export const ReviewDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Review/Review.dispatcher'
);

/** @namespace Component/ProductReviewForm/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductReviewFormContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer,
    reviewRatings: state.ConfigReducer.reviewRatings
});

/** @namespace Component/ProductReviewForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductReviewFormContainerMapDispatchProps => ({
    addReview: (options) => ReviewDispatcher.then(
        ({ default: dispatcher }) => dispatcher.submitProductReview(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE))
});

/** @namespace Component/ProductReviewForm/Container */
export class ProductReviewFormContainer extends PureComponent<
ProductReviewFormContainerProps,
ProductReviewFormContainerState
> {
    containerFunctions: ProductReviewFormContainerFunctions = ({
        onReviewSubmitSuccess: this._onReviewSubmitSuccess.bind(this),
        onStarRatingClick: this._onStarRatingClick.bind(this),
        onReviewError: this._onReviewError.bind(this)
    });

    __construct(props: ProductReviewFormContainerProps): void {
        super.__construct?.(props);

        const { customer: { firstname: nickname } } = this.props;
        const reviewData = { nickname };

        this.state = {
            isLoading: false,
            ratingData: {},
            reviewData,
            isSubmitted: false
        };
    }

    containerProps(): Pick<ProductReviewFormComponentProps, ProductReviewFormComponentContainerPropKeys> {
        const { reviewRatings } = this.props;
        const {
            isLoading,
            ratingData,
            reviewData,
            isSubmitted
        } = this.state;

        return {
            isLoading,
            isSubmitted,
            ratingData,
            reviewData,
            reviewRatings
        };
    }

    _onReviewError(_: HTMLFormElement, invalidFields: FormFields | null): void {
        const reviewsAreNotValid = invalidFields;

        this.setState({ isLoading: !reviewsAreNotValid });
    }

    async _onReviewSubmitSuccess(
        form: HTMLFormElement,
        fields: FormFields
    ): Promise<void> {
        const {
            product,
            addReview,
            hideActiveOverlay,
            goToPreviousHeaderState,
            showNotification
        } = this.props;

        const { ratingData: rating_data } = this.state;

        this.setState({ isLoading: true });

        const {
            nickname,
            title,
            detail
        } = transformToNameValuePair(fields as Record<string, FieldData>);

        const { sku: product_sku = '' } = product;

        try {
            await addReview({
                nickname,
                title,
                detail,
                product_sku,
                rating_data
            });

            this.setState({
                ratingData: {},
                reviewData: {}
            });

            goToPreviousHeaderState();
            hideActiveOverlay();
        } catch (error) {
            showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError));
        } finally {
            this.setState({ isLoading: false });
        }
    }

    _onStarRatingClick(rating_id: number, option_id: string): void {
        this.setState(({ ratingData }) => ({
            ratingData: { ...ratingData, [ rating_id ]: option_id }
        }));
    }

    _handleFieldChange(fieldName: string, value: string): void {
        this.setState(({ reviewData }) => ({
            reviewData: { ...reviewData, [ fieldName ]: value }
        }));
    }

    render(): ReactElement {
        return (
            <ProductReviewForm
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewFormContainer);
