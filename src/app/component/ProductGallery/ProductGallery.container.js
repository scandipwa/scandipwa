import React, { PureComponent } from 'react';
import { ProductType } from 'Type/ProductList';

import ProductGallery from './ProductGallery.component';

export const PRODUCT_IMAGE_PATH = '/media/catalog/product';
export const THUMBNAIL_KEY = 'thumbnail';

export class ProductGalleryContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    }

    constructor(props) {
        super(props);

        this.containerProps = () => ({
            gallery: this.getGalleryPictures()
        });
    }

    getGalleryPictures() {
        const {
            product: {
                media_gallery_entries: mediaGallery = [],
                thumbnail: { path } = {},
                name
            }
        } = this.props;

        if (mediaGallery.length) {
            return Object.values(mediaGallery.reduce((acc, media, i) => {
                const {
                    id,
                    file,
                    types,
                    label,
                    position,
                    disabled,
                    media_type
                } = media;

                const canBeShown = !disabled;
                if (!canBeShown) return acc;

                const isThumbnail = types.includes(THUMBNAIL_KEY);
                const key = isThumbnail ? 0 : (position + i);

                return {
                    ...acc,
                    [key]: {
                        id: isThumbnail ? THUMBNAIL_KEY : id,
                        image: `${PRODUCT_IMAGE_PATH}${file}`,
                        alt: label || __('%s - Picture #%s', name, i),
                        type: media_type
                    }
                };
            }, {}));
        }

        if (!path) {
            return [{ type: 'image' }];
        }

        return [{
            image: path && `${PRODUCT_IMAGE_PATH}${path}`,
            id: THUMBNAIL_KEY,
            alt: name,
            type: 'image'
        }, ...Array(3).fill({ type: 'image', isPlaceholder: true })];
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
