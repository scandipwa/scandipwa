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
import { updateMeta } from 'Store/Meta';

export const PDP_IMAGE_HEIGHT = 650;
export const PDP_IMAGE_WIDTH = 533;

export const PLP_IMAGE_WIDTH = 248;
export const PLP_IMAGE_HEIGHT = 297;

/**
 * Meta Dispatcher
 * @class MetaDispatcher
 */
export class MetaDispatcher {
    /**
     * Set meta for category
     * @param {Object} category
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    updateWithCategory(category, dispatch) {
        const meta = this._getCategoryMeta(category);
        dispatch(updateMeta(meta));
    }

    /**
     * Set meta for product
     * @param {Object} product
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    updateWithProduct(product, dispatch) {
        const meta = this._getProductMeta(product);
        dispatch(updateMeta(meta));
    }

    /**
     * Get meta for product
     * @param {Object} product
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */
    _getProductMeta(product) {
        const {
            media_gallery_entries = {}, name, canonical_url,
            meta_title, meta_keyword, meta_description
        } = product;

        const {
            base: { url: imageSrc = '' } = {}
        } = media_gallery_entries[0] || {};

        return {
            description: meta_description,
            imageHeight: PDP_IMAGE_HEIGHT,
            imageWidth: PDP_IMAGE_WIDTH,
            keywords: meta_keyword,
            title: meta_title,
            imageAlt: name,
            canonical_url,
            imageSrc
        };
    }

    /**
     * Get meta for category
     * @param {Object} category
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */
    _getCategoryMeta(category) {
        const {
            description,
            name, canonical_url, imageSrc,
            meta_title, meta_keyword, meta_description
        } = category;

        return {
            description: meta_description || description,
            imageHeight: PLP_IMAGE_HEIGHT,
            imageWidth: PLP_IMAGE_WIDTH,
            title: meta_title || name,
            keywords: meta_keyword,
            imageAlt: name,
            canonical_url,
            imageSrc
        };
    }
}

export default new MetaDispatcher();
