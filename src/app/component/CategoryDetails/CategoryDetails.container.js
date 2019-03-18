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

import { connect } from 'react-redux';
import { CmsBlocksAndSliderDispatcher } from 'Store/CmsBlocksAndSlider';
import CategoryDetails from './CategoryDetails.component';

const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

const mapDispatchToProps = dispatch => ({
    requestBlocks: (options) => {
        CmsBlocksAndSliderDispatcher.handleData(dispatch, options);
    }
});

const CategoryDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);

export default CategoryDetailsContainer;
