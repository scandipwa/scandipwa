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
import { PagesType } from 'Type/ProductList';
import './CategoryProductList.style';

/**
 * List of category products
 * @class CategoryProductList
 */
class CategoryProductList extends Component {
    constructor(props) {
        super(props);
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
        const { pagesCount } = this.state;
        const { totalPages } = this.props;
        const { maxPage, loadedPagesCount } = this.getPagesBounds();

        // console.log(currentPage, previousPage);
        const shouldUpdateList = this.node && maxPage < totalPages && totalPages > 0 && pagesCount === loadedPagesCount;

        if (shouldUpdateList) {
            if ('IntersectionObserver' in window) {
                const options = {
                    rootMargin: '0px',
                    threshold: 0.1
                };

                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > 0) {
                            this.stopObserving();
                            this.showLoading();
                        }
                    });
                }, options);

                this.observer.observe(this.node);
            } else {
                this.showLoading();
            }
        }
    }

    /**
     * Get boundaries for pages.
     * @return {{maxPage:Number, minPage:Number}}
     */
    getPagesBounds() {
        const { pages } = this.props;

        const keys = Object.keys(pages);

        const maxPage = Math.max(...keys);
        const minPage = Math.min(...keys);

        const loadedPagesCount = keys.length;

        return { maxPage, minPage, loadedPagesCount };
    }

    showLoading() {
        const { pagesCount } = this.state;
        const { increasePage } = this.props;

        this.setState({ pagesCount: pagesCount + 1 });

        increasePage();
    }

    stopObserving() {
        if (this.observer) {
            if (this.observer.unobserve) {
                this.observer.unobserve(this.node);
            }

            if (this.observer.disconnect) {
                this.observer.disconnect();
            }

            this.observer = null;
        }
    }

    renderNoProducts() {
        return (
            <div
              block="CategoryProductList"
              elem="NoProducts"
            >
                No products found
            </div>
        );
    }

    renderPage(items, key) {
        const { customFilters, isLoading } = this.props;

        // if (items.length === 0) return this.renderNoProducts();

        return (
            <ul block="CategoryProductList" key={ key } mods={ { isLoading } }>
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

    /**
     * render placeholders beneath the product list
     */
    renderPlaceholder(showLoadMore, isLoading) {
        const renderPlaceholders = () => (
            <>
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
                <ProductCard product={ {} } />
            </>
        );

        if (isLoading) {
            return (
                <div block="CategoryProductList">
                    { renderPlaceholders() }
                </div>
            );
        }

        if (showLoadMore) {
            return (
                <div block="CategoryProductList">
                    <div
                      block="CategoryProductList"
                      elem="Placeholder"
                      ref={ (node) => { this.node = node; } }
                    >
                        { renderPlaceholders() }
                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        const { pagesCount } = this.state;
        const { pages, totalPages, isLoading } = this.props;
        const { maxPage, loadedPagesCount } = this.getPagesBounds();

        const showLoadMore = maxPage < totalPages && !isLoading;

        return (
            <>
                { !isLoading && Object.entries(pages).map(([pageNumber, items]) => this.renderPage(items, pageNumber)) }
                { this.renderPlaceholder(showLoadMore, isLoading) }
            </>
        );
    }
}

CategoryProductList.propTypes = {
    pages: PagesType.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    increasePage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    customFilters: PropTypes.objectOf(PropTypes.array)
};

CategoryProductList.defaultProps = {
    customFilters: {}
};

export default CategoryProductList;
