import { connect } from 'react-redux';
import { CmsPageDispatcher } from 'Store/CmsPage';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CmsPage from './CmsPage.component';

const mapStateToProps = state => ({
    page: state.CmsPageReducer.page,
    isLoading: state.CmsPageReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    requestPage: (options) => {
        CmsPageDispatcher.handleData(dispatch, options);
    },

    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.updateWithCmsPage(breadcrumbs, dispatch);
    }
});

const CmsPageContainer = connect(mapStateToProps, mapDispatchToProps)(CmsPage);

export default CmsPageContainer;
