import { connect } from 'react-redux';
import { CmsBlocksAndSliderDispatcher } from 'Store/CmsBlocksAndSlider';
import { toggleBreadcrumbs, BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import HomePage from './HomePage.component';

const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

const mapDispatchToProps = dispatch => ({
    requestBlocks: (options) => {
        CmsBlocksAndSliderDispatcher.handleData(dispatch, options);
    },
    disableBreadcrumbs: () => {
        BreadcrumbsDispatcher.update([], dispatch);
        dispatch(toggleBreadcrumbs(false));
    },
    updateSlider: (options) => {
        CmsBlocksAndSliderDispatcher.handleData(dispatch, options);
    }
});

const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePageContainer;
