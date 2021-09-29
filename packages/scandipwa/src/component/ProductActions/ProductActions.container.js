/* eslint-disable spaced-comment */
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
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductContainer
} from 'Component/Product/Product.container';
import { IN_STOCK } from 'Component/Product/Stock.config';

import ProductActions from './ProductActions.component';

/** @namespace Component/ProductActions/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    isPriceAlertEnabled: state.ConfigReducer.product_alert_allow_price,
    isInStockAlertEnabled: state.ConfigReducer.product_alert_allow_stock,
    displayProductStockStatus: state.ConfigReducer.display_product_stock_status,
    areReviewsEnabled: state.ConfigReducer.reviews_are_enabled
});

/** @namespace Component/ProductActions/Container */
export class ProductActionsContainer extends ProductContainer {
    static propTypes = {
        ...ProductContainer.propTypes,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getLink: PropTypes.func.isRequired,
        areReviewsEnabled: PropTypes.bool.isRequired,
        displayProductStockStatus: PropTypes.bool.isRequired,
        isInStockAlertEnabled: PropTypes.bool.isRequired,
        setActiveProduct: PropTypes.func.isRequired
    };

    containerFunctions = {
        ...this.containerFunctions,
        showOnlyIfLoaded: this.showOnlyIfLoaded.bind(this)
    };

    containerProps() {
        const {
            areDetailsLoaded,
            areReviewsEnabled,
            displayProductStockStatus,
            getLink,
            isInStockAlertEnabled
        } = this.props;

        return {
            ...super.containerProps(),
            areDetailsLoaded,
            areReviewsEnabled,
            displayProductStockStatus,
            getLink,
            isInStockAlertEnabled,
            offerCount: this.getOfferCount(),
            offerType: this.getOfferType(),
            stockMeta: this.getStockMeta(),
            metaLink: this.getMetaLink()
        };
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);

        const { selectedProduct: prevSelectedProduct } = prevState;
        const { selectedProduct } = this.state;
        const { setActiveProduct } = this.props;

        // Updates ProductPages active product state, to
        // match selected product variant
        if (selectedProduct !== prevSelectedProduct) {
            setActiveProduct(selectedProduct);
        }
    }

    //#region META
    getMetaLink() {
        const { getLink } = this.props;

        return window.location.origin + getLink().replace(/\?.*/, '');
    }

    getStockMeta() {
        const {
            product,
            product: { variants = [] },
            configurableVariantIndex
        } = this.props;

        const {
            stock_status
        } = variants[configurableVariantIndex] || product;

        if (stock_status === IN_STOCK) {
            return 'https://schema.org/InStock';
        }

        return 'https://schema.org/OutOfStock';
    }

    getOfferType() {
        const { product: { variants } } = this.props;

        if (variants && variants.length >= 1) {
            return 'https://schema.org/AggregateOffer';
        }

        return 'https://schema.org/Offer';
    }

    getOfferCount() {
        const { product: { variants } } = this.props;

        if (variants && variants.length) {
            return variants.length;
        }

        return 0;
    }
    //#endregion

    showOnlyIfLoaded(expression, content, placeholder = content) {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) {
            return placeholder;
        }

        if (areDetailsLoaded && !expression) {
            return null;
        }

        return content;
    }

    render() {
        return (
            <ProductActions
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
