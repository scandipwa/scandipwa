/* eslint-disable spaced-comment */
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

import { connect } from 'react-redux';

import { ProductType } from 'Component/Product/Product.config';
import {
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductContainer,
} from 'Component/Product/Product.container';
import { ReactElement } from 'Type/Common.type';
import { GQLProductStockStatus } from 'Type/Graphql.type';
import { RootState } from 'Util/Store/Store.type';

import ProductActions from './ProductActions.component';
import {
    ProductActionsComponentProps,
    ProductActionsContainerFunctions,
    ProductActionsContainerMapStateProps,
    ProductActionsContainerPropKeys,
    ProductActionsContainerProps,
    ProductActionsContainerState,
} from './ProductActions.type';

/** @namespace Component/ProductActions/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductActionsContainerMapStateProps => ({
    ...sourceMapStateToProps(state),
    isPriceAlertEnabled: state.ConfigReducer.product_alert_allow_price,
    isInStockAlertEnabled: state.ConfigReducer.product_alert_allow_stock,
    displayProductStockStatus: state.ConfigReducer.display_product_stock_status,
    areReviewsEnabled: state.ConfigReducer.reviews_are_enabled,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/ProductActions/Container */
export class ProductActionsContainer extends ProductContainer<
ProductActionsContainerProps,
ProductActionsContainerState
> {
    static defaultProps: Partial<ProductActionsContainerProps> = ProductContainer.defaultProps;

    containerFunctions: ProductActionsContainerFunctions = {
        ...this.containerFunctions,
        showOnlyIfLoaded: this.showOnlyIfLoaded.bind(this),
    };

    containerProps(): Pick<ProductActionsComponentProps, ProductActionsContainerPropKeys> {
        const {
            areDetailsLoaded,
            areReviewsEnabled,
            displayProductStockStatus,
            getLink,
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            isMobile,
        } = this.props;

        return {
            ...super.containerProps(),
            areDetailsLoaded,
            areReviewsEnabled,
            displayProductStockStatus,
            getLink,
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            isPricePreview: this.isPricePreview(),
            offerCount: this.getOfferCount(),
            offerType: this.getOfferType(),
            stockMeta: this.getStockMeta(),
            metaLink: this.getMetaLink(),
            isMobile,
        };
    }

    componentDidUpdate(prevProps: ProductActionsContainerProps, prevState: ProductActionsContainerState): void {
        super.componentDidUpdate(prevProps, prevState);

        const { selectedProduct: prevSelectedProduct } = prevState;
        const { selectedProduct } = this.state;
        const { setActiveProduct } = this.props;

        // Updates ProductPages active product state, to
        // match selected product variant
        if (selectedProduct !== prevSelectedProduct) {
            setActiveProduct(selectedProduct || {});
        }
    }

    //#region META
    getMetaLink(): string {
        const { getLink } = this.props;

        return window.location.origin + getLink().replace(/\?.*/, '');
    }

    getStockMeta(): string {
        const {
            product,
            product: { variants = [] },
            // !FIXME: This prop is always undefined. We must fix it later.
            configurableVariantIndex,
        } = this.props;

        const {
            stock_status,
        } = variants[ configurableVariantIndex ] || product;

        if (stock_status === GQLProductStockStatus.IN_STOCK) {
            return 'https://schema.org/InStock';
        }

        return 'https://schema.org/OutOfStock';
    }

    getOfferType(): string {
        const { product: { variants } } = this.props;

        if (variants && variants.length >= 1) {
            return 'https://schema.org/AggregateOffer';
        }

        return 'https://schema.org/Offer';
    }

    getOfferCount(): number {
        const { product: { variants } } = this.props;

        if (variants && variants.length) {
            return variants.length;
        }

        return 0;
    }
    //#endregion

    showOnlyIfLoaded(expression: boolean, content: ReactElement, placeholder = content): ReactElement {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) {
            return placeholder;
        }

        if (areDetailsLoaded && !expression) {
            return null;
        }

        return content;
    }

    // Display preview price for bundle when nothing is selected
    isPricePreview(): boolean {
        const {
            product: {
                type_id: type,
                dynamic_price: dynamicPrice,
            } = {},
        } = this.props;

        const { enteredOptions = [], selectedOptions = [] } = this.state;

        return (
            enteredOptions.length <= 0
            && selectedOptions.length <= 0
            && type === ProductType.BUNDLE
            && !!dynamicPrice
        );
    }

    render(): ReactElement {
        return (
            <ProductActions
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
