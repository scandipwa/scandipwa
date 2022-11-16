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
} from './ProductLinks.type';

/** @namespace Component/ProductLinks/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductLinksContainerMapStateProps => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts,
    areDetailsLoaded: state.CartReducer.areDetailsLoaded,
});

/** @namespace Component/ProductLinks/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductLinksContainerMapDispatchProps => ({});

/** @namespace Component/ProductLinks/Container */
export class ProductLinksContainer extends PureComponent<ProductLinksContainerProps> {
    static defaultProps: Partial<ProductLinksContainerProps> = {
        numberOfProductsToDisplay: 4,
    };

    containerProps(): ProductLinksComponentProps {
        const {
            areDetailsLoaded,
            linkType,
            linkedProducts,
            numberOfProductsToDisplay,
            title,
        } = this.props;

        return {
            areDetailsLoaded,
            linkType,
            linkedProducts,
            numberOfProductsToDisplay,
            title,
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
