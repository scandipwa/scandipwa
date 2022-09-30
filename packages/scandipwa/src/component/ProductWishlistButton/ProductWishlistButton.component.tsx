/* eslint-disable max-len */
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

import { MouseEvent, PureComponent } from 'react';

import HeartIcon from 'Component/HeartIcon';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';

import { ProductWishlistButtonComponentProps } from './ProductWishlistButton.type';

import './ProductWishlistButton.style';

/** @namespace Component/ProductWishlistButton/Component */
export class ProductWishlistButtonComponent extends PureComponent<ProductWishlistButtonComponentProps> {
    static defaultProps: Partial<ProductWishlistButtonComponentProps> = {
        mix: {},
        // !FIXME: isLoading is never set
        isLoading: false,
        isDisabled: false,
        isInWishlist: false,
    };

    __construct(props: ProductWishlistButtonComponentProps): void {
        super.__construct?.(props);

        this.onClick = this.onClick.bind(this);
    }

    getTitle(): string {
        const { isInWishlist, isSignedIn } = this.props;

        if (!isSignedIn) {
            return __('Please sign in first!');
        }

        if (isInWishlist) {
            return __('Remove from Wishlist');
        }

        return __('Add to Wishlist');
    }

    onClick(e: MouseEvent): Promise<void> {
        const {
            isInWishlist,
            addToWishlist,
            removeFromWishlist,
        } = this.props;

        e.preventDefault();
        e.stopPropagation();

        if (!isInWishlist) {
            return addToWishlist();
        }

        return removeFromWishlist();
    }

    renderButton(): ReactElement {
        const { isInWishlist, isDisabled, mix } = this.props;

        return (
            <button
              block="ProductWishlistButton"
              elem="Button"
              mods={ { isInWishlist, isDisabled } }
              mix={ { block: 'Button', mix } }
              title={ this.getTitle() }
              onClick={ this.onClick }
            >
                <HeartIcon isActive={ isInWishlist } />
            </button>
        );
    }

    renderLoader(): ReactElement {
        const { isLoading } = this.props;

        // !FIXME: Is loading is never set

        return (
            <Loader isLoading={ isLoading } />
        );
    }

    renderContent(): ReactElement {
        return (
            <div block="ProductWishlistButton">
                { this.renderButton() }
                { this.renderLoader() }
            </div>
        );
    }

    render(): ReactElement {
        const { magentoProduct } = this.props;

        if (Array.isArray(magentoProduct) && magentoProduct.length > 0) {
            return this.renderContent();
        }

        return null;
    }
}

export default ProductWishlistButtonComponent;
