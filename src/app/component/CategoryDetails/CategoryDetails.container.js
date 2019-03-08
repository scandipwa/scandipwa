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
