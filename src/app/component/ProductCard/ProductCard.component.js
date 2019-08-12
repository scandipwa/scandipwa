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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import AddToCart from 'Component/AddToCart';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import ProductReviewRating from 'Component/ProductReviewRating';
import { ProductType, FilterType } from 'Type/ProductList';
import { getVariantsIndexes } from 'Util/Product';
import { getReviewText } from 'Util/Review';
import { getTabIndex } from 'Util/Link';
import { HashLink } from 'react-router-hash-link';
import { convertKeyValueObjectToQueryString } from 'Util/Url';
import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 */
class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.handleConfigurableClick = this.handleConfigurableClick.bind(this);
    }

    getConfigurableParameters() {
        const { product: { variants = [] }, customFilters = {} } = this.props;
        const filterKeys = Object.keys(customFilters);

        if (filterKeys.length < 0) return { indexes: [], parameters: {} };

        const indexes = getVariantsIndexes(variants, customFilters);
        const [index] = indexes;

        if (!variants[index]) return { indexes: [], parameters: {} };
        const { attributes } = variants[index];

        const parameters = Object.entries(attributes)
            .reduce((parameters, [key, { attribute_value }]) => {
                if (filterKeys.includes(key)) return { ...parameters, [key]: attribute_value };
                return parameters;
            }, {});

        return { indexes, index, parameters };
    }

    getLinkTo(parameters) {
        const { product: { url_key }, product } = this.props;

        if (!url_key) return undefined;
        return {
            pathname: `/product/${ url_key }`,
            state: { product },
            search: convertKeyValueObjectToQueryString(parameters)
        };
    }

    /**
     * Get thumbnail for the product
     * @param {Number} currentVariantIndex configurable product index
     * @return {void}
     */
    getThumbnail(currentVariantIndex) {
        const { product: { thumbnail: { path } = {}, variants = [] } } = this.props;

        if (variants[currentVariantIndex] === undefined) return path;
        return variants[currentVariantIndex].thumbnail.path;
    }

    handleConfigurableClick() {
        const {
            product,
            updateProductToBeRemovedAfterAdd,
            wishlistItem
        } = this.props;

        if (wishlistItem && updateProductToBeRemovedAfterAdd) {
            return updateProductToBeRemovedAfterAdd({ product });
        }

        return null;
    }

    renderAddOrConfigureProduct(variantIndexes = [], linkTo, price) {
        const { product, product: { url_key, type_id } } = this.props;

        if (!price) return (<TextPlaceholder length="medium" />);

        if (type_id === 'configurable' && variantIndexes.length !== 1) {
            return (
                <Link
                  to={ linkTo }
                  tabIndex={ getTabIndex(url_key) }
                  onClick={ this.handleConfigurableClick }
                >
                    <span>{ __('Configure Product') }</span>
                </Link>
            );
        }

        if (type_id === 'grouped') {
            return (
                <Link to={ linkTo } tabIndex={ getTabIndex(url_key) }>
                    <span>{ __('View details') }</span>
                </Link>
            );
        }

        const [index] = variantIndexes;
        return (
            <AddToCart
              product={ product }
              fullWidth
              removeWishlistItem
              configurableVariantIndex={ index }
            />
        );
    }

    renderAddToWishlistButton(notReady) {
        const { product } = this.props;
        if (notReady) return <TextPlaceholder length="medium" />;

        return (
            <ProductWishlistButton
              product={ product }
              fullWidth
            />
        );
    }

    renderReviewSummary(linkTo) {
        const { product: { review_summary, url_key } } = this.props;

        if (!review_summary || !review_summary.review_count) return null;

        const _linkTo = { ...linkTo, hash: '#reviews' };
        const reviewText = getReviewText(review_summary.review_count);

        return (
            <div block="ProductCard" elem="ReviewSummary">
                <ProductReviewRating summary={ review_summary.rating_summary } />
                <HashLink smooth to={ _linkTo } tabIndex={ getTabIndex(url_key) }>
                    <span>{ `${review_summary.review_count} ${reviewText}` }</span>
                </HashLink>
            </div>
        );
    }

    render() {
        const {
            product: {
                name,
                url_key,
                variants = [],
                attributes = {}
            },
            product,
            arePlaceholdersShown,
            mix
        } = this.props;

        const { brand: { attribute_value: brand } = {} } = attributes;
        const { index, indexes, parameters } = this.getConfigurableParameters();
        const thumbnail = this.getThumbnail(index);
        const TagName = url_key ? Link : 'div';
        const isLoading = !url_key;
        const linkTo = this.getLinkTo(parameters);

        const { price } = variants[index] || product;

        return (
            <li block="ProductCard" mods={ { isLoading } } mix={ mix }>
                <TagName
                  to={ linkTo }
                  tabIndex={ getTabIndex(url_key) }
                >
                    <Image
                      src={ thumbnail && `/media/jpg/catalog/product${ thumbnail }` }
                      alt={ __('Product Thumbnail') }
                      arePlaceholdersShown={ arePlaceholdersShown }
                      showGreyPlaceholder={ !url_key }
                    />
                    <span block="ProductCard" elem="Brand">
                        <TextPlaceholder content={ brand } />
                    </span>
                    <h4><TextPlaceholder content={ name } /></h4>
                    { price && <ProductPrice price={ price } /> }
                </TagName>
                { this.renderReviewSummary(linkTo) }
                <div block="ProductCard" elem="Actions">
                    { this.renderAddOrConfigureProduct(indexes, linkTo, price) }
                    <ProductWishlistButton
                      product={ product }
                      fullWidth
                      isReady={ !!price }
                    />
                </div>
            </li>
        );
    }
}

ProductCard.propTypes = {
    product: ProductType.isRequired,
    customFilters: FilterType,
    arePlaceholdersShown: PropTypes.bool,
    wishlistItem: PropTypes.bool,
    updateProductToBeRemovedAfterAdd: PropTypes.func.isRequired,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string
    })
};

ProductCard.defaultProps = {
    customFilters: {},
    arePlaceholdersShown: false,
    wishlistItem: false,
    mix: {}
};

export default ProductCard;
