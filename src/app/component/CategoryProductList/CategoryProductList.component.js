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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CategoryProductListPlaceholder from 'Component/CategoryProductListPlaceholder';
import { PagesType, FilterType } from 'Type/ProductList';
import ProductCard from 'Component/ProductCard';
import CategoryPagination from 'Component/CategoryPagination';
import './CategoryProductList.style';

/**
 * List of category products
 * @class CategoryProductList
 */
class CategoryProductList extends PureComponent {
    constructor(props) {
        super(props);

        this.nodes = {};
        this.observedNodes = [];
        this.pagesIntersecting = [];
    }

    componentDidUpdate() {
        const { updatePage, isLoading } = this.props;

        if (isLoading) this.pagesIntersecting = [];

        if (!this.observer && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                const { currentPage } = this.props;

                entries.forEach(({ target, isIntersecting }) => {
                    const page = +Object.keys(this.nodes).find(node => this.nodes[node] === target);
                    const index = this.pagesIntersecting.indexOf(page);

                    if (isIntersecting) {
                        this.pagesIntersecting.push(page);
                    } else if (index > -1) {
                        this.pagesIntersecting.splice(index, 1);
                    }
                });

                const minPage = Math.min(...this.pagesIntersecting);
                if (minPage < Infinity && minPage !== currentPage) updatePage(minPage);
            }, {
                rootMargin: '0px',
                threshold: 0.1
            });
        }

        this.updateObserver();
    }

    componentWillUnmount() {
        if (this.observer && this.observer.disconnect) this.observer.disconnect();
        this.observer = null;
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

    renderLoadButton() {
        const { isShowLoading, loadPrevPage } = this.props;
        if (!isShowLoading) return null;

        return (
            <div
              block="CategoryProductList"
              elem="LoadButton"
              role="button"
              tabIndex="0"
              onKeyUp={ loadPrevPage }
              onClick={ loadPrevPage }
            >
                    {__('Load previous') }
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
        const { pages, selectedFilters, isLoading } = this.props;

        if (isLoading) return null;

        return Object.entries(pages).map(([pageNumber, items = []]) => (
            <ul
              block="CategoryProductList"
              elem="Page"
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
        const { isLoading, isVisible, loadPage } = this.props;

        return (
            <div block="CategoryProductList" elem="Page">
                <CategoryProductListPlaceholder
                  isLoading={ isLoading }
                  isVisible={ isVisible }
                  updatePages={ loadPage }
                />
            </div>
        );
    }

    renderPagination() {
        const { requestPage, isLoading: isPageLoading, totalPages } = this.props;

        const isLoading = isPageLoading && totalPages === 0;
        return <CategoryPagination isLoading={ isLoading } onPageSelect={ requestPage } />;
    }

    render() {
        const { totalPages, isLoading } = this.props;

        if (!isLoading && totalPages === 0) return this.renderNoProducts();

        return (
            <div block="CategoryProductList" mods={ { isLoading } }>
                { this.renderLoadButton() }
                { this.renderPages() }
                { this.renderCategoryPlaceholder() }
                { this.renderPagination() }
            </div>
        );
    }
}

CategoryProductList.propTypes = {
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
    isVisible: PropTypes.bool.isRequired
};

export default CategoryProductList;
