/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
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

import Field from 'Component/Field';
import ProductCard from 'Component/ProductCard';
import { ProductType } from 'Type/ProductList';
import { BUNDLE, GROUPED } from 'Util/Product';

import './WishlistItem.style';

/** @namespace Component/WishlistItem/Component */
export class WishlistItem extends PureComponent {
    static propTypes = {
        addToCart: PropTypes.func,
        changeQuantity: PropTypes.func,
        product: ProductType.isRequired,
        changeDescription: PropTypes.func,
        removeItem: PropTypes.func,
        isLoading: PropTypes.bool,
        isRemoving: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        isEditingActive: PropTypes.bool.isRequired,
        attributes: PropTypes.array.isRequired,
        handleSelectIdChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        addToCart: () => {},
        changeQuantity: () => {},
        changeDescription: () => {},
        removeItem: () => {},
        isLoading: false,
        isRemoving: false
    };

    renderDescription() {
        const {
            product: { wishlist: { description } },
            changeDescription,
            isMobile
        } = this.props;
        const { isEditingActive } = this.props;

        if (!description && !isEditingActive && isMobile) {
            return null;
        }

        const isDisabled = isMobile && !isEditingActive;
        const mods = isMobile
            ? {
                isNotEditingActive: !isEditingActive,
                isEmpty: !description
            }
            : {};

        return (
            <Field
              id="description"
              name="description"
              type="textarea"
              rows={ 3 }
              value={ description }
              mix={ { block: 'WishlistItem', elem: 'CommentField', mods } }
              placeholder={ __('Add a comment') }
              isDisabled={ isDisabled }
              onChange={ changeDescription }
            />
        );
    }

    renderQuantityFieldInput() {
        const {
            product: { wishlist: { quantity } },
            changeQuantity
        } = this.props;

        return (
            <Field
              id="item_qty"
              name="item_qty"
              type="number"
              min={ 1 }
              value={ quantity }
              mix={ {
                  block: 'WishlistItem',
                  elem: 'QuantityInput',
                  mix: { block: 'Field', mods: { style: 'inline' } }
              } }
              onChange={ changeQuantity }
            />
        );
    }

    renderQuantityField() {
        const {
            product: { wishlist: { quantity } },
            isEditingActive,
            isMobile
        } = this.props;

        if (!isMobile) {
            return this.renderQuantityFieldInput();
        }

        return (
            <div block="WishlistItem" elem="QuantityWrapper">
                <span block="WishlistItem" elem="QuantityText">{ __('Qty:') }</span>
                { isEditingActive
                    ? this.renderQuantityFieldInput()
                    : quantity }
            </div>
        );
    }

    renderAddToCartButton() {
        const {
            addToCart,
            isEditingActive,
            isMobile
        } = this.props;

        const mods = isMobile ? { isEditingActive } : {};

        return (
            <button
              block="Button"
              mods={ { isHollow: isMobile } }
              mix={ { block: 'WishlistItem', elem: 'AddToCart', mods } }
              onClick={ addToCart }
            >
                { __('Add to cart') }
            </button>
        );
    }

    renderRemove() {
        const { removeItem } = this.props;

        return (
            <button
              block="WishlistItem"
              elem="Remove"
              onClick={ removeItem }
              aria-label={ __('Remove') }
            />
        );
    }

    getWishlistProduct() {
        const {
            product,
            product: { url, type_id }
        } = this.props;

        if (type_id !== 'configurable') {
            return product;
        }

        const wishedVariant = product.variants.find(({ sku }) => sku === product.wishlist.sku);

        if (!wishedVariant) {
            return {
                ...product,
                url
            };
        }

        return {
            ...wishedVariant,
            url
        };
    }

    renderOption = (option) => {
        const { label, value } = option;

        return (
            <div block="WishlistItemOption">
                <span block="WishlistItemOption" elem="Label">
                    { label }
                    :
                </span>
                <span block="WishlistItemOption" elem="Value">
                    { value }
                </span>
            </div>
        );
    };

    renderOptionsList() {
        const { product: { wishlist: { options } } } = this.props;

        return (
            <div block="WishlistItemOptions" elem="List">
                { options.map(this.renderOption) }
            </div>
        );
    }

    renderOptions() {
        const { product: { wishlist: { options = [] }, type_id } } = this.props;

        if (
            options.length === 0
            || (type_id !== BUNDLE && type_id !== GROUPED)
        ) {
            return null;
        }

        return (
            <div block="WishlistItemOptions">
                { this.renderOptionsList() }
            </div>
        );
    }

    renderName() {
        const { product: { name } } = this.props;

        return (
            <span>{ name }</span>
        );
    }

    renderPrice(productPrice) {
        return (
            <div
              block="WishlistItem"
              elem="Price"
            >
                { productPrice() }
            </div>
        );
    }

    renderAttributes() {
        const { attributes } = this.props;

        return (
            <div block="WishlistItem" elem="AttributeWrapper">
                { attributes.map((attr) => (
                    <span mix={ { block: 'ProductAttribute' } } key={ attr }>
                        { attr }
                    </span>
                )) }
            </div>
        );
    }

    renderSelectCheckbox() {
        const { product: { wishlist: { id } }, handleSelectIdChange, isEditingActive } = this.props;

        return (
            <div block="WishlistItem" elem="Select" mods={ { isEditingActive } }>
                <Field
                  type="checkbox"
                  id={ `option-${ id }` }
                  name={ `option-${ id }` }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleSelectIdChange(id) }
                />
            </div>
        );
    }

    renderContentMobile({
        content: { productPrice },
        pictureBlock: { picture: renderPicture },
        renderCardLinkWrapper
    }) {
        const { isEditingActive } = this.props;

        return (
            <>
                <div block="WishlistItem" elem="SelectWrapper">
                    { this.renderSelectCheckbox() }
                    <div block="WishlistItem" elem="ContentWrapper" mods={ { isEditingActive } }>
                        { renderCardLinkWrapper((
                            <figure mix={ { block: 'ProductCard', elem: 'Figure' } }>
                                { renderPicture({ block: 'WishlistItem', elem: 'Picture' }) }
                            </figure>
                        ), { block: 'WishlistItem', elem: 'ImageWrapper' }) }
                        <div block="WishlistItem" elem="Content">
                            { this.renderName() }
                            { this.renderAttributes() }
                            { this.renderQuantityField() }
                            <div block="WishlistItem" elem="RowWrapper">
                                { this.renderPrice(productPrice) }
                                { this.renderAddToCartButton() }
                            </div>
                        </div>
                    </div>
                </div>
                { this.renderDescription() }
            </>
        );
    }

    renderContent = (renderMethods) => {
        const {
            content: { productPrice },
            pictureBlock: { picture: renderPicture },
            renderCardLinkWrapper
        } = renderMethods;

        const { isMobile } = this.props;

        if (isMobile) {
            return this.renderContentMobile(renderMethods);
        }

        return (
            <>
                <div block="WishlistItem" elem="FigureWrapper">
                    { renderCardLinkWrapper(
                        <>
                            <figure mix={ { block: 'ProductCard', elem: 'Figure' } }>
                                { renderPicture({ block: 'WishlistItem', elem: 'Picture' }) }
                            </figure>
                            { this.renderName() }
                            { this.renderAttributes() }
                        </>
                    ) }
                    { this.renderRemove() }
                </div>
                { this.renderOptions() }
                <div block="WishlistItem" elem="Content">
                    <div block="WishlistItem" elem="RowWrapper">
                        { this.renderQuantityField() }
                        { this.renderPrice(productPrice) }
                    </div>
                    { this.renderDescription() }
                    { this.renderAddToCartButton() }
                </div>
            </>
        );
    };

    render() {
        const { isLoading, isRemoving } = this.props;

        return (
            <ProductCard
              product={ this.getWishlistProduct() }
              mix={ { block: 'WishlistItem', elem: 'ProductCard' } }
              isLoading={ isLoading || isRemoving }
              renderContent={ this.renderContent }
              hideWishlistButton
              hideCompareButton
            />
        );
    }
}

export default WishlistItem;
