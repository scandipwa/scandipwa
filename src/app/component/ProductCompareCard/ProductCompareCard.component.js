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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ProductType } from 'Type/ProductList';
import Image from 'Component/Image/Image.component';
import media, { PRODUCT_MEDIA } from 'Util/Media/Media';
import './ProductCompareCard.style';
import TextPlaceholder from 'Component/TextPlaceholder';
import Link from 'Component/Link';
import { objectToUri } from 'Util/Url';
import ProductPrice from 'Component/ProductPrice/ProductPrice.container';

export default class ProductCompareCard extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        removeProductFromCompare: PropTypes.func.isRequired,
        areCompareProductsLoading: PropTypes.bool.isRequired
    };

    _isThumbnailAvailable(path) {
        return path && path !== 'no_selection';
    }

    _getThumbnail(product) {
        const { thumbnail: { path } = {} } = product;
        if (this._isThumbnailAvailable(path)) return path;
        const { product: { thumbnail: { path: parentPath } = {} } } = this.props;
        if (this._isThumbnailAvailable(parentPath)) return parentPath;

        return '';
    }

    _getLinkTo() {
        const { product: { parent_url_key, url_key } } = this.props;

        if (!url_key) return undefined;
        const { parameters } = this._getConfigurableParameters();
        return {
            pathname: `/product/${ parent_url_key || url_key }`,
            search: objectToUri(parameters)
        };
    }

    _getConfigurableParameters() {
        const { product: { attributes } } = this.props;

        const attributeKeys = Object.keys(attributes);

        if (attributeKeys.length < 0) return { parameters: {} };

        const parameters = Object.entries(attributes)
            .reduce((parameters, [key, { attribute_value }]) => {
                if (attributeKeys.includes(key) && attribute_value !== null) {
                    return {
                        ...parameters,
                        [key]: attribute_value
                    };
                }

                return parameters;
            }, {});

        return { parameters };
    }

    renderCard() {
        const { product, removeProductFromCompare, areCompareProductsLoading } = this.props;
        return (
            <li
              block="ProductCompareCard"
              elem="Wrapper"
              key={ product.id }
            >
                <Link
                  block="ProductCompareCard"
                  elem="Link"
                  to={ this._getLinkTo() }
                >
                    <div
                      block="ProductCompareCard"
                      elem="DetailWrapper"
                    >
                    { this.renderImage(product) }
                    { this.renderName(product) }
                    { this.renderProductPrice(product) }
                    </div>
                </Link>
                <button
                  block="Button"
                  mix={ { block: 'ProductCompareCard', elem: 'RemoveButton' } }
                  onClick={ (e) => {
                      if (!areCompareProductsLoading) removeProductFromCompare({ product });
                      e.preventDefault();
                  } }
                >
                    <TextPlaceholder content={ __('Remove') } />
                </button>
                <div
                  block="ProductCompareCard"
                  elem="AttributeWrapper"
                />
            </li>
        );
    }

    renderImage(product) {
        const shit = this._getThumbnail(product);
        const imageUrl = shit && media(shit, PRODUCT_MEDIA);

        return (
            <div
              block="ProductCompareCard"
              elem="ProductImage"
            >
                <Image
                  src={ imageUrl }
                  ratio="square"
                />
            </div>
        );
    }

    renderName(product) {
        const { name } = product;

        return (
            <h3
              block="ProductCompareCard"
              elem="Name"
            >
                { name }
            </h3>
        );
    }

    renderProductPrice(product) {
        const { price } = product;

        return (
            <ProductPrice
              price={ price }
              mix={ { block: 'ProductCompareCard', elem: 'Price' } }
            />
        );
    }

    render() {
        return this.renderCard();
    }
}
