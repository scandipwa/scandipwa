import React, { PureComponent } from 'react';
import { getQueryParam } from 'Util/Url';
import PropTypes from 'prop-types';
import { PagesType } from 'Type/ProductList';
import CategoryProductList from './CategoryProductList.component';

export class CategoryProductListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pagesCount: 1
        };

        this.availableFunctions = {
            getPageFromUrl: this.getPageFromUrl.bind(this),
            loadPrevPage: this.loadPage.bind(this, false),
            isShowLoading: this.isShowLoading.bind(this),
            isVisible: this.isVisible.bind(this),
            loadPage: this.loadPage.bind(this)
        };
    }

    componentDidMount() {
        const { pages } = this.props;
        const { pagesCount } = this.state;
        const pagesLength = Object.keys(pages).length;

        if (pagesCount !== pagesLength) {
            this.setState({ pagesCount: pagesLength });
        }
    }

    static getDerivedStateFromProps(props) {
        const { isLoading } = props;
        if (isLoading) return { pagesCount: 1 };
        return null;
    }

    getPageFromUrl() {
        return +(getQueryParam('page', location) || 1);
    }

    getPagesBounds() {
        const { pages } = this.props;
        const keys = Object.keys(pages);

        return {
            maxPage: Math.max(...keys),
            minPage: Math.min(...keys),
            loadedPagesCount: keys.length
        };
    }

    isShowLoading() {
        const { isLoading } = this.props;
        const { minPage } = this.getPagesBounds();
        return minPage > 1 && !isLoading;
    }

    isVisible() {
        const { totalPages } = this.props;
        const { maxPage } = this.getPagesBounds();
        return maxPage < totalPages;
    }

    loadPage(next = true) {
        const { pagesCount } = this.state;
        const { loadPage, totalPages, isLoading } = this.props;
        const { minPage, maxPage, loadedPagesCount } = this.getPagesBounds();

        const isUpdatable = totalPages > 0 && pagesCount === loadedPagesCount;
        const shouldUpdateList = next ? maxPage < totalPages : minPage > 1;

        if (isUpdatable && shouldUpdateList && !isLoading) {
            this.setState({ pagesCount: pagesCount + 1 });
            loadPage(next ? maxPage + 1 : minPage - 1);
        }
    }

    render() {
        return (
            <CategoryProductList
              { ...this.props }
              { ...this.availableFunctions }
            />
        );
    }
}

CategoryProductListContainer.propTypes = {
    pages: PagesType.isRequired,
    loadPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default CategoryProductListContainer;
