/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import CmsBlocksAndSliderReducer from './CmsBlocksAndSlider.reducer';
import CmsBlocksAndSliderDispatcher from './CmsBlocksAndSlider.dispatcher';

import {
    UPDATE_CMS_BLOCKS,
    UPDATE_SLIDER,
    updateCmsBlocks,
    updateSlider
} from './CmsBlocksAndSlider.action';

export {
    CmsBlocksAndSliderReducer,
    CmsBlocksAndSliderDispatcher,
    UPDATE_CMS_BLOCKS,
    UPDATE_SLIDER,
    updateCmsBlocks,
    updateSlider
};
