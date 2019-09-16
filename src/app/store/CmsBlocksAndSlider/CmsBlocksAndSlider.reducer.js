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

import {
    UPDATE_CMS_BLOCKS,
    UPDATE_SLIDER
} from './CmsBlocksAndSlider.action';

export const initialState = {
    blocks: {},
    slider: {}
};

const CmsBlocksAndSliderReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_CMS_BLOCKS:
        const { blocks: { items: blockItems } } = action;
        const items = blockItems.reduce((o, item) => {
            const { disabled, identifier } = item;
            return disabled ? o : { ...o, [identifier]: item };
        }, {});

        if (state.blocks.items) {
            return {
                ...state,
                blocks: { items: { ...state.blocks.items, ...items } }
            };
        }

        return {
            ...state,
            blocks: {
                items
            }
        };

    case UPDATE_SLIDER:
        const { slider } = action;

        const castToAbsolutePath = (path) => {
            if (path.charAt(0) !== '/') {
                return `/${path}`;
            }

            return path;
        };

        slider.slides = slider.slides.map(item => ({
            slide_id: item.slide_id,
            image: castToAbsolutePath(item.image),
            slide_text: item.slide_text
        }));

        return {
            ...state,
            slider
        };

    default:
        return state;
    }
};

export default CmsBlocksAndSliderReducer;
