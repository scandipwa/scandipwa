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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from 'Component/ProductCard';
import CategoryProductListPlaceholder from 'Component/CategoryProductListPlaceholder';
import { PagesType } from 'Type/ProductList';
import { getQueryParam } from 'Util/Url';
import './CategoryProductList.style';

/**
 * List of category products
 * @class CategoryProductList
 */
class CategoryProductList extends Component {
    constructor(props) {
        super(props);

        this.nodes = {};
        this.observedNodes = [];

        this.state = {
            pagesCount: 1
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { pages, isLoading } = props;
        const { pagesCount } = state;

        if (isLoading) return { pagesCount: 1 };
        if (Object.keys(pages).length !== pagesCount) return { pagesCount };

        return null;
    }

    componentDidUpdate() {
        const { updatePage, isLoading } = this.props;

        if (isLoading) {
            this.pagesIntersecting = [];
        }

        if (!this.observer && 'IntersectionObserver' in window) {
            const options = {
                rootMargin: '0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver((entries) => {
                const pageFromUrl = parseInt(getQueryParam('page', location) || 1, 10);

                entries.forEach((entry) => {
                    const page = parseInt(
                        Object.keys(this.nodes).find(key => this.nodes[key] === entry.target),
                        10
                    );

                    const index = this.pagesIntersecting.indexOf(page);

                    if (entry.isIntersecting) {
                        if (index === -1) this.pagesIntersecting.push(page);
                    } else if (index > -1) {
                        this.pagesIntersecting.splice(index, 1);
                    }
                });

                const minPage = Math.min(...this.pagesIntersecting);
                if (minPage < Infinity && minPage !== pageFromUrl) {
                    updatePage(minPage);
                }
            }, options);
        }
        this.updateObserver();
    }

    componentWillUnmount() {
        if (this.observer) {
            if (this.observer.disconnect) {
                this.observer.disconnect();
            }

            this.observer = null;
        }
    }

    /**
     * Get boundaries for pages.
     * @return {{maxPage:Number, minPage:Number, loadedPagesCount:Number}}
     */
    getPagesBounds() {
        const { pages } = this.props;

        const keys = Object.keys(pages);

        const maxPage = Math.max(...keys);
        const minPage = Math.min(...keys);

        const loadedPagesCount = keys.length;

        return { maxPage, minPage, loadedPagesCount };
    }

    updateObserver() {
        if (!this.observer || Object.keys(this.nodes).length <= 0) return;

        Object
            .values(this.nodes)
            .forEach((node) => {
                if (node && !this.observedNodes.includes(node)) {
                    this.observer.observe(node);
                    this.observedNodes.push(node);
                }
            });

        this.observedNodes
            .filter(node => !Object.values(this.nodes).includes(node))
            .forEach((node) => {
                this.observer.unobserve(node);
                this.observedNodes.splice(this.observedNodes.indexOf(node), 1);
            });
    }

    loadPage(next = true) {
        const { pagesCount } = this.state;
        const { loadPage, totalPages } = this.props;
        const { minPage, maxPage, loadedPagesCount } = this.getPagesBounds();

        const isUpdateable = totalPages > 0 && pagesCount === loadedPagesCount;
        const shouldUpdateList = next ? maxPage < totalPages : minPage > 1;

        if (isUpdateable && shouldUpdateList) {
            const modifier = next ? maxPage + 1 : minPage - 1;

            this.setState({ pagesCount: pagesCount + 1 });
            loadPage(modifier);
        }
    }

    renderLoadButton(next = false, hidden = false) {
        return (
            <div
              block="CategoryProductList"
              elem="LoadButton"
              mods={ { hidden } }
              role="button"
              tabIndex="-1"
              onKeyUp={ () => this.loadPage(next) }
              onClick={ () => this.loadPage(next) }
            >
                    { next ? __('Load next') : __('Load previous') }
            </div>
        );
    }

    renderNoProducts() {
        return (
            <div
              block="CategoryProductList"
            >
                <div
                  block="CategoryProductList"
                  elem="NoProducts"
                >
                    No products found
                </div>
            </div>
        );
    }

    renderPage(items, key) {
        const { customFilters, isLoading } = this.props;

        return (
            <ul
              block="CategoryProductList"
              elem="Page"
              key={ key }
              mods={ { isLoading } }
              ref={ (node) => { this.nodes[key] = node; } }
            >
                { items.map(product => (
                    <ProductCard
                      product={ product }
                      key={ product.id }
                      customFilters={ customFilters }
                      arePlaceholdersShown
                    />
                )) }
            </ul>
        );
    }

    render() {
        const { pages, totalPages, isLoading } = this.props;
        const { minPage, maxPage } = this.getPagesBounds();

        const showLoadPrevious = minPage > 1 && !isLoading;
        const showLoadNext = maxPage < totalPages;

        if (!isLoading && totalPages === 0) return this.renderNoProducts();

        return (
            <div block="CategoryProductList">
                { showLoadPrevious && this.renderLoadButton() }
                { !isLoading && Object.entries(pages).map(([pageNumber, items]) => this.renderPage(items, pageNumber)) }
                <CategoryProductListPlaceholder
                  isLoading={ isLoading }
                  isVisible={ showLoadNext }
                  updatePages={ () => this.loadPage() }
                />
                { showLoadNext && this.renderLoadButton(true, true) }
            </div>
        );
    }
}

CategoryProductList.propTypes = {
    pages: PagesType.isRequired,
    loadPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updatePage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    customFilters: PropTypes.objectOf(PropTypes.array)
};

CategoryProductList.defaultProps = {
    customFilters: {}
};

export default CategoryProductList;
