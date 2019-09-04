import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQueryParam, setQueryParams } from 'Util/Url';
import { PagesType } from 'Type/ProductList';
import { HistoryType } from 'Type/Common';
import CategoryProductList from './ProductList.component';

export class ProductListContainer extends PureComponent {
    static propTypes = {
        history: HistoryType.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }).isRequired,
        pages: PagesType.isRequired,
        pageSize: PropTypes.number,
        isLoading: PropTypes.bool.isRequired,
        totalItems: PropTypes.number.isRequired,
        requestProductList: PropTypes.func.isRequired,
        selectedFilters: PropTypes.objectOf(PropTypes.shape),

        filter: PropTypes.shape({}),
        search: PropTypes.string,
        sort: PropTypes.shape({})
    };

    static defaultProps = {
        pageSize: 12,
        filter: {},
        search: '',
        selectedFilters: {},
        sort: undefined
    };

    state = { pagesCount: 1 };

    containerFunctions = {
        loadPrevPage: this.loadPage.bind(this, false),
        loadPage: this.loadPage.bind(this),
        updatePage: this.updatePage.bind(this),
        requestPage: this.requestPage.bind(this)
    };

    componentDidMount() {
        const { pages } = this.props;
        const { pagesCount } = this.state;
        const pagesLength = Object.keys(pages).length;

        if (pagesCount !== pagesLength) {
            this.setState({ pagesCount: pagesLength });
        }

        this.requestPage(this._getPageFromUrl());
    }

    componentDidUpdate(prevProps) {
        const { sort, search, filter } = this.props;
        const { sort: prevSort, search: prevSearch, filter: prevFilter } = prevProps;

        if (search !== prevSearch
            || JSON.stringify(sort) !== JSON.stringify(prevSort)
            || JSON.stringify(filter) !== JSON.stringify(prevFilter)
        ) this.requestPage(this._getPageFromUrl());
    }

    static getDerivedStateFromProps(props) {
        const { isLoading } = props;
        if (isLoading) return { pagesCount: 1 };
        return null;
    }

    containerProps = () => ({
        currentPage: this._getPageFromUrl(),
        isShowLoading: this._isShowLoading(),
        isVisible: this._isVisible()
    });

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
            // this.setState({ pagesCount: pagesCount + 1 });
            this.requestPage(next ? maxPage + 1 : minPage - 1, true);
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

export default withRouter(ProductListContainer);
