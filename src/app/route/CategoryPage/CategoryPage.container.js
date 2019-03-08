import { connect } from 'react-redux';
import { CategoryDispatcher } from 'Store/Category';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CategoryPage from './CategoryPage.component';

const mapStateToProps = state => ({
    category: state.CategoryReducer.category,
    items: state.CategoryReducer.items,
    totalItems: state.CategoryReducer.totalItems,
    sortFields: state.CategoryReducer.sortFields,
    filters: state.CategoryReducer.filters,
    isLoading: state.CategoryReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    requestCategory: (options) => {
        CategoryDispatcher.handleData(dispatch, options);
    },

    updateBreadcrumbs: (breadcrumbs) => {
        if (Object.keys(breadcrumbs).length) BreadcrumbsDispatcher.updateWithCategory(breadcrumbs, dispatch);
        else BreadcrumbsDispatcher.update([], dispatch);
    }
});

const CategoryPageContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

export default CategoryPageContainer;
