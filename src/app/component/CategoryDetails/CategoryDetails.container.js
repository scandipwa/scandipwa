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

import { connect } from 'react-redux';
import { CmsBlocksAndSliderDispatcher } from 'Store/CmsBlocksAndSlider';
import CategoryDetails from './CategoryDetails.component';

/** @middleware Component/CategoryDetails/Container/mapStateToProps */
export const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

/** @middleware Component/CategoryDetails/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    requestBlocks: options => CmsBlocksAndSliderDispatcher.handleData(dispatch, options)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
