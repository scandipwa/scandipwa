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
import { connect } from 'react-redux';

import LinkedProductsReducer from 'Store/LinkedProducts/LinkedProducts.reducer';
import { ReactElement } from 'Type/Common.type';
import { withReducers } from 'Util/DynamicReducer';
import { RootState } from 'Util/Store/Store.type';

import ProductLinks from './ProductLinks.component';
import {
    ProductLinksComponentProps,
    ProductLinksContainerMapDispatchProps,
    ProductLinksContainerMapStateProps,
    ProductLinksContainerProps,
    ProductLinksContainerState,
} from './ProductLinks.type';

/** @namespace Component/ProductLinks/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductLinksContainerMapStateProps => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts,
});

/** @namespace Component/ProductLinks/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductLinksContainerMapDispatchProps => ({});

/** @namespace Component/ProductLinks/Container */
export class ProductLinksContainer<
P extends Readonly<ProductLinksContainerProps> = Readonly<ProductLinksContainerProps>,
S extends ProductLinksContainerState = ProductLinksContainerState,
> extends PureComponent <P, S> {
    static defaultProps: Partial<ProductLinksContainerProps> = {
        numberOfProductsToDisplay: 4,
        areDetailsLoaded: true,
    };

    state: ProductLinksContainerState = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false,
    };

    containerProps(): ProductLinksComponentProps {
        const {
            areDetailsLoaded,
            linkType,
            linkedProducts,
            numberOfProductsToDisplay,
            title,
        } = this.props;
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions,
        } = this.state;

        return {
            areDetailsLoaded,
            linkType,
            linkedProducts,
            numberOfProductsToDisplay,
            title,
            productCardFunctions: {
                setSiblingsHaveBrands: () => this.setState({ siblingsHaveBrands: true }),
                setSiblingsHavePriceBadge: () => this.setState({ siblingsHavePriceBadge: true }),
                setSiblingsHaveTierPrice: () => this.setState({ siblingsHaveTierPrice: true }),
                setSiblingsHaveConfigurableOptions: () => this.setState({ siblingsHaveConfigurableOptions: true }),
            },
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions,
            },
        };
    }

    render(): ReactElement {
        const {
            linkType,
            linkedProducts: {
                [ linkType ]: {
                    items = [],
                } = {},
            },
        } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <ProductLinks
              { ...this.containerProps() }
            />
        );
    }
}

export default withReducers({
    LinkedProductsReducer,
})(connect(mapStateToProps, mapDispatchToProps)(ProductLinksContainer));
