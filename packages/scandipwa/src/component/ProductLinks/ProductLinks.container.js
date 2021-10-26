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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import LinkedProductsReducer from 'Store/LinkedProducts/LinkedProducts.reducer';
import { ProductType } from 'Type/ProductList.type';
import { withReducers } from 'Util/DynamicReducer';

import ProductLinks from './ProductLinks.component';

/** @namespace Component/ProductLinks/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

/** @namespace Component/ProductLinks/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ProductLinks/Container */
export class ProductLinksContainer extends PureComponent {
    static propTypes = {
        linkedProducts: PropTypes.objectOf(ProductType).isRequired,
        linkType: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        numberOfProductsToDisplay: PropTypes.number,
        areDetailsLoaded: PropTypes.bool
    };

    static defaultProps = {
        numberOfProductsToDisplay: 4,
        areDetailsLoaded: true
    };

    state = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    containerProps() {
        const {
            areDetailsLoaded,
            linkType,
            linkedProducts,
            numberOfProductsToDisplay,
            title
        } = this.props;
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
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
                setSiblingsHaveConfigurableOptions: () => this.setState({ siblingsHaveConfigurableOptions: true })
            },
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions
            }
        };
    }

    render() {
        const {
            linkType,
            linkedProducts: {
                [linkType]: {
                    items = []
                } = {}
            }
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
    LinkedProductsReducer
})(connect(mapStateToProps, mapDispatchToProps)(ProductLinksContainer));
