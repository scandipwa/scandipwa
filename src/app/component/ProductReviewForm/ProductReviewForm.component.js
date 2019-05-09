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
import { ProductType } from 'Type/ProductList';
import Field from 'Component/Field';
import Form from 'Component/Form';
import ContentWrapper from 'Component/ContentWrapper';
import TextPlaceholder from 'Component/TextPlaceholder';
import Loader from 'Component/Loader';
import './ProductReviewForm.style';

/**
 * ProductReviewForm
 * @class ProductReviewForm
 */
class ProductReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    onReviewSubmitAttempt(fields, invalidFields) {
        this.setState({ isLoading: true });
        const { showNotification } = this.props;
        if (invalidFields) {
            showNotification('error', 'Incorrect data! Please resolve all field validation errors.');
        }
        this.setState({ isLoading: !invalidFields });
    }

    onReviewSubmitSuccess(fields) {
        const {
            product,
            addReview
        } = this.props;

        const {
            nickname,
            title,
            detail
        } = fields;

        const { sku } = product;

        /** To-do: replace with real rating data */
        const ratingData = [
            {
                rating_id: 1,
                option_id: 3
            }
        ];
        this.setState({ isLoading: true });

        return addReview({
            nickname,
            title,
            detail,
            product_sku: sku,
            rating_data: ratingData
        }).then((success) => {
            /** Clear form after submitting valid review */
            if (success) this.formRef.form.reset();
            this.setState({ isLoading: false });
        });
    }

    render() {
        const {
            product,
            areDetailsLoaded
        } = this.props;
        const { isLoading } = this.state;

        return (
            <ContentWrapper
              mix={ { block: 'ProductReviewForm' } }
              wrapperMix={ { block: 'ProductReviewForm', elem: 'Wrapper' } }
              label="Product Review Form"
            >
                { !areDetailsLoaded ? (
                    <p block="ProductReviewForm" elem="PlaceholderBlock">
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                    </p>
                ) : (
                    <Form
                      key="product-review"
                      ref={ (el) => { this.formRef = el; } }
                      onSubmit={ () => this.onReviewSubmitAttempt() }
                      onSubmitSuccess={ fields => this.onReviewSubmitSuccess(fields) }
                      onSubmitError={ (fields, invalidFields) => this.onReviewSubmitAttempt(fields, invalidFields) }
                    >
                        <h3>
                            { 'You\'re reviewing: ' }
                        </h3>
                        <p>
                            { product.name }
                        </p>
                        <Field
                          type="text"
                          label="Nickname"
                          id="nickname"
                          validation={ ['notEmpty', 'nickname'] }
                        />
                        <Field
                          type="text"
                          label="Title"
                          id="title"
                          validation={ ['notEmpty', 'title'] }
                        />
                        <Field
                          type="textarea"
                          label="Details"
                          id="detail"
                          validation={ ['notEmpty', 'details'] }
                        />
                        <Loader isLoading={ isLoading } />
                        <div block="ProductReviewForm" elem="Buttons">
                            <button>Submit Review</button>
                        </div>
                    </Form>
                )}
            </ContentWrapper>
        );
    }
}

ProductReviewForm.propTypes = {
    product: ProductType.isRequired,
    addReview: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

ProductReviewForm.defaultProps = {
};

export default ProductReviewForm;
