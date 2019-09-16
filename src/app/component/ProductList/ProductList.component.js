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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CategoryProductListPlaceholder from 'Component/CategoryProductListPlaceholder';
import { PagesType, FilterType } from 'Type/ProductList';
import ProductCard from 'Component/ProductCard';
import CategoryPagination from 'Component/CategoryPagination';
import { MixType } from 'Type/Common';
import './ProductList.style';

export const observerThreshold = 10;

/**
 * List of category products
 * @class CategoryProductList
 */
export default class ProductList extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        pages: PagesType.isRequired,
        selectedFilters: FilterType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        updatePage: PropTypes.func.isRequired,
        totalPages: PropTypes.number.isRequired,
        loadPage: PropTypes.func.isRequired,
        requestPage: PropTypes.func.isRequired,
        loadPrevPage: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired,
        isShowLoading: PropTypes.bool.isRequired,
        isVisible: PropTypes.bool.isRequired,
        isInfiniteLoaderEnabled: PropTypes.bool,
        isPaginationEnabled: PropTypes.bool,
        numberOfPlaceholders: PropTypes.number,
        mix: MixType
    };

    static defaultProps = {
        mix: {},
        title: '',
        isInfiniteLoaderEnabled: true,
        isPaginationEnabled: true,
        numberOfPlaceholders: 4
    };

    nodes = {};

    observedNodes = [];

    pagesIntersecting = [];

    componentDidUpdate() {
        const { isInfiniteLoaderEnabled } = this.props;
        if (isInfiniteLoaderEnabled) this.observePageChange();
    }

    componentWillUnmount() {
        if (this.observer && this.observer.disconnect) this.observer.disconnect();
        this.observer = null;
    }

    observePageChange() {
        const { updatePage, isLoading } = this.props;

        if (isLoading) this.pagesIntersecting = [];

        if (!this.observer && 'IntersectionObserver' in window) {
            const threshold = this._getThreshold();

            this.observer = new IntersectionObserver((entries) => {
                const { currentPage } = this.props;

                entries.forEach(({ target, isIntersecting }) => {
                    const page = +Object.keys(this.nodes).find(node => this.nodes[node] === target);
                    const index = this.pagesIntersecting.indexOf(page);

                    if (isIntersecting && index === -1) {
                        this.pagesIntersecting.push(page);
                    }

                    if (!isIntersecting && index > -1) {
                        this.pagesIntersecting.splice(index, 1);
                    }
                });

                const minPage = Math.min(...this.pagesIntersecting);
                if (minPage < Infinity && minPage !== currentPage) updatePage(minPage);
            }, {
                rootMargin: '0px',
                threshold
            });
        }

        this.updateObserver();
    }

    updateObserver() {
        const currentNodes = Object.values(this.nodes);

        if (!this.observer || currentNodes.length <= 0) return;

        currentNodes.forEach((node) => {
            if (node && !this.observedNodes.includes(node)) {
                this.observer.observe(node);
                this.observedNodes.push(node);
            }
        });

        this.observedNodes = this.observedNodes.reduce((acc, node) => {
            if (!currentNodes.includes(node)) {
                this.observer.unobserve(node);
            } else {
                acc.push(node);
            }

            return acc;
        }, []);
    }

    _getThreshold() {
        const hundredPercent = 100;

        return Array.from(
            { length: (hundredPercent / observerThreshold) + 1 },
            (_, i) => i * (observerThreshold / hundredPercent)
        );
    }

    renderLoadButton() {
        const { isShowLoading, isInfiniteLoaderEnabled, loadPrevPage } = this.props;
        if (!isShowLoading || !isInfiniteLoaderEnabled) return null;

        return (
            <div
              block="CategoryProductList"
              elem="LoadButton"
              role="button"
              tabIndex="0"
              onKeyUp={ loadPrevPage }
              onClick={ loadPrevPage }
            >
                    { __('Load previous') }
            </div>
        );
    }

    renderNoProducts() {
        return (
            <div block="CategoryProductList">
                <div
                  block="CategoryProductList"
                  elem="ProductsMissing"
                >
                    <h2>{ __('We are sorry!') }</h2>
                    <h3>{ __('There were no products found matching your request.') }</h3>
                    <p>{ __('Please, try removing selected filters and try again!') }</p>
                </div>
            </div>
        );
    }

    renderPages() {
        const {
            selectedFilters,
            isLoading,
            pages,
            mix
        } = this.props;

        if (isLoading) return null;

        return Object.entries(pages).map(([pageNumber, items = []]) => (
            <ul
              block="CategoryProductList"
              elem="Page"
              mix={ { ...mix, elem: 'Page' } }
              key={ pageNumber }
              ref={ (node) => { this.nodes[pageNumber] = node; } }
            >
                { items.map(product => (
                    <ProductCard
                      product={ product }
                      key={ product.id }
                      selectedFilters={ selectedFilters }
                      arePlaceholdersShown
                    />
                )) }
            </ul>
        ));
    }

    renderCategoryPlaceholder() {
        const {
            mix,
            loadPage,
            isLoading,
            isVisible,
            numberOfPlaceholders,
            isInfiniteLoaderEnabled
        } = this.props;

        if (!isInfiniteLoaderEnabled && !isLoading) return null;

        return (
            <div
              block="CategoryProductList"
              elem="Page"
              mix={ { ...mix, elem: 'Page' } }
            >
                <CategoryProductListPlaceholder
                  isLoading={ isLoading }
                  isVisible={ isVisible }
                  updatePages={ loadPage }
                  numberOfPlaceholders={ numberOfPlaceholders }
                />
            </div>
        );
    }

    renderPagination() {
        const {
            isLoading,
            totalPages,
            requestPage,
            isPaginationEnabled
        } = this.props;

        if (!isPaginationEnabled) return null;

        return (
            <CategoryPagination
              isLoading={ isLoading }
              totalPages={ totalPages }
              onPageSelect={ requestPage }
            />
        );
    }

    renderTitle() {
        const { title } = this.props;
        if (!title) return null;

        return <h2>{ title }</h2>;
    }

    render() {
        const { totalPages, isLoading, mix } = this.props;

        if (!isLoading && totalPages === 0) return this.renderNoProducts();

        return (
            <div
              block="CategoryProductList"
              mods={ { isLoading } }
              mix={ mix }
            >
                { this.renderTitle() }
                { this.renderLoadButton() }
                { this.renderPages() }
                { this.renderCategoryPlaceholder() }
                { this.renderPagination() }
            </div>
        );
    }
}
