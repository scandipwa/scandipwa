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

export const UPDATE_META = 'UPDATE_META';
export const UPDATE_META_FROM_PRODUCT = 'UPDATE_META_FROM_PRODUCT';
export const UPDATE_META_FROM_COTEGORY = 'UPDATE_META_FROM_COTEGORY';

export const updateMeta = metadata => ({
    type: UPDATE_META,
    payload: metadata
});

export const updateMetaFromProduct = product => ({
    type: UPDATE_META_FROM_PRODUCT,
    payload: product
});

export const updateMetaFromCategory = category => ({
    type: UPDATE_META_FROM_COTEGORY,
    payload: category
});
