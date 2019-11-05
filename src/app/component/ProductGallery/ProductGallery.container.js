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

import { PureComponent } from 'react';

import { ProductType } from 'Type/ProductList';

import ProductGallery, { IMAGE_TYPE } from './ProductGallery.component';

export const THUMBNAIL_KEY = 'thumbnail';
export const AMOUNT_OF_PLACEHOLDERS = 3;

export class ProductGalleryContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    getGalleryPictures() {
        const {
            product: {
                media_gallery_entries: mediaGallery = [],
                thumbnail: { path } = {},
                name
            }
        } = this.props;

        if (mediaGallery.length) {
            return Object.values(mediaGallery.reduce((acc, srcMedia, i) => {
                const {
                    types,
                    position,
                    disabled
                } = srcMedia;

                const canBeShown = !disabled;
                if (!canBeShown) return acc;

                const isThumbnail = types.includes(THUMBNAIL_KEY);
                const key = isThumbnail ? 0 : (position + i);

                return {
                    ...acc,
                    [key]: srcMedia
                };
            }, {}));
        }

        if (!path) {
            return [{ type: 'image' }];
        }

        return [{
            file: path,
            id: THUMBNAIL_KEY,
            label: name,
            media_type: IMAGE_TYPE
        }, ...Array(AMOUNT_OF_PLACEHOLDERS).fill({ media_type: 'placeholder' })];
    }

    containerProps = () => ({
        gallery: this.getGalleryPictures(),
        productName: this._getProductName()
    });

    _getProductName() {
        const { product: { name } } = this.props;
        return name;
    }

    render() {
        return (
            <ProductGallery
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductGalleryContainer;
