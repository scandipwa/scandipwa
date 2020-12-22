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

import Image from 'Component/Image';
import {
    IMAGE_TYPE, PLACEHOLDER_TYPE, THUMBNAIL_KEY, VIDEO_TYPE
} from 'Component/ProductGallery/ProductGallery.config';
import media, { PRODUCT_MEDIA } from 'Util/Media';

import './ProductGalleryThumbnailImage.style';

/** @namespace Component/ProductGalleryThumbnailImage/Component */
export class ProductGalleryThumbnailImage extends PureComponent {
    static propTypes = {
        media: PropTypes.shape({
            label: PropTypes.string,
            file: PropTypes.string,
            media_type: PropTypes.string,
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            thumbnail: PropTypes.shape({
                url: PropTypes.string
            })
        }).isRequired
    };

    renderMedia() {
        const { media: { media_type } } = this.props;

        switch (media_type) {
        case VIDEO_TYPE:
            return this.renderVideo();
        case IMAGE_TYPE:
            return this.renderImage();
        case PLACEHOLDER_TYPE:
            return this.renderPlaceholder();
        default:
            return null;
        }
    }

    renderPlaceholder() {
        return (
            <Image
              ratio="custom"
              mix={ { block: 'ProductGalleryThumbnailImage' } }
              isPlaceholder
            />
        );
    }

    renderVideo() {
        const {
            media: {
                thumbnail: { url },
                label
            }
        } = this.props;

        return (
            <Image
              ratio="custom"
              src={ url }
              alt={ label }
              mix={ { block: 'ProductGalleryThumbnailImage' } }
            />
        );
    }

    renderImage() {
        const {
            media: {
                label: alt,
                file,
                thumbnail: { url: thumbnailUrl } = {},
                id
            }
        } = this.props;

        if (id === THUMBNAIL_KEY) {
            return this.renderPlaceholder();
        }

        const src = thumbnailUrl || media(file, PRODUCT_MEDIA);

        return (
            <Image
              src={ src }
              alt={ alt }
              ratio="custom"
              mix={ { block: 'ProductGalleryThumbnailImage' } }
            />
        );
    }

    render() {
        return (
            <div
              block="ProductGalleryThumbnailImage"
            >
                { this.renderMedia() }
            </div>
        );
    }
}

export default ProductGalleryThumbnailImage;
