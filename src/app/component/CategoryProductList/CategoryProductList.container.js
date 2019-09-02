import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQueryParam, setQueryParams } from 'Util/Url';
import { PagesType } from 'Type/ProductList';
import { ProductListDispatcher, updateLoadStatus } from 'Store/ProductList';
import { HistoryType } from 'Type/Common';
import CategoryProductList from './CategoryProductList.component';

export const mapStateToProps = state => ({
    pages: state.ProductListReducer.pages,
    isLoading: state.ProductListReducer.isLoading,
    totalItems: state.ProductListReducer.totalItems
});

export const mapDispatchToProps = dispatch => ({
    requestProductList: options => ProductListDispatcher.handleData(dispatch, options),
    updateLoadStatus: isLoading => dispatch(updateLoadStatus(isLoading))
});

export class CategoryProductListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pagesCount: 1
        };

        this.containerFunctions = {
            loadPrevPage: this.loadPage.bind(this, false),
            loadPage: this.loadPage.bind(this),
            updatePage: this.updatePage.bind(this)
        };

        this.containerProps = () => ({
            filters: this._getFilters(),
            currentPage: this._getPageFromUrl(),
            isShowLoading: this._isShowLoading(),
            isVisible: this._isVisible(),
            totalPages: this._getTotalPages()
        });
    }

    componentDidMount() {
        const { pages } = this.props;
        const { pagesCount } = this.state;
        const pagesLength = Object.keys(pages).length;

        if (pagesCount !== pagesLength) {
            this.setState({ pagesCount: pagesLength });
        }

        this.requestPage();
    }

    static getDerivedStateFromProps(props) {
        const { isLoading } = props;
        if (isLoading) return { pagesCount: 1 };
        return null;
    }

    _getFilters() {
        return {};
    }

    _getPageFromUrl() {
        const { location } = this.props;
        return +(getQueryParam('page', location) || 1);
    }

    _getPagesBounds() {
        const { pages, totalItems, pageSize } = this.props;
        const keys = Object.keys(pages);

        return {
            maxPage: Math.max(...keys),
            minPage: Math.min(...keys),
            totalPages: Math.ceil(totalItems / pageSize),
            loadedPagesCount: keys.length
        };
    }

    _getTotalPages() {
        const { totalItems, pageSize } = this.props;

        return Math.ceil(totalItems / pageSize);
    }

    _isShowLoading() {
        const { isLoading } = this.props;
        const { minPage } = this._getPagesBounds();
        return minPage > 1 && !isLoading;
    }

    _isVisible() {
        const { maxPage, totalPages } = this._getPagesBounds();
        return maxPage < totalPages;
    }

    loadPage(next = true) {
        const { pagesCount } = this.state;
        const { isLoading } = this.props;
        const {
            minPage,
            maxPage,
            totalPages,
            loadedPagesCount
        } = this._getPagesBounds();

        const isUpdatable = totalPages > 0 && pagesCount === loadedPagesCount;
        const shouldUpdateList = next ? maxPage < totalPages : minPage > 1;

        if (isUpdatable && shouldUpdateList && !isLoading) {
            this.setState({ pagesCount: pagesCount + 1 });
            // loadPage(next ? maxPage + 1 : minPage - 1);
        }
    }

    updatePage(pageNumber) {
        const { location, history } = this.props;

        setQueryParams({
            page: pageNumber === 1 ? '' : pageNumber
        }, location, history);
    }

    requestPage(currentPage = 1, isNext = false) {
        const {
            sort,
            search,
            filter,
            pageSize,
            requestProductList
        } = this.props;

        if (!isNext) window.scrollTo(0, 0);

        const options = {
            isNext,
            args: {
                sort,
                filter,
                search,
                pageSize,
                currentPage
            }
        };

        requestProductList(options);
    }

    render() {
        return (
            <CategoryProductList
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

CategoryProductListContainer.propTypes = {
    history: HistoryType.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pages: PagesType.isRequired,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    totalItems: PropTypes.number.isRequired,
    requestProductList: PropTypes.func.isRequired,

    filter: PropTypes.shape({}),
    search: PropTypes.string,
    sort: PropTypes.shape({})
};

CategoryProductListContainer.defaultProps = {
    pageSize: 12,
    filter: {},
    search: '',
    sort: undefined
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer));
