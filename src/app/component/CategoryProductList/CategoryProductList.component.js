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
import CategoryProductListPlaceholder from 'Component/CategoryProductListPlaceholder';
import { PagesType, FilterType } from 'Type/ProductList';
import ProductCard from 'Component/ProductCard';
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
        this.pagesIntersecting = [];
    }

    componentDidUpdate() {
        const { updatePage, isLoading, getPageFromUrl } = this.props;

        if (isLoading) this.pagesIntersecting = [];

        if (!this.observer && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
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
                if (minPage < Infinity && minPage !== getPageFromUrl()) updatePage(minPage);
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
        if (!isShowLoading()) return null;

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
                  elem="PictureMissing"
                >
                    { __('No products found') }
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

    render() {
        const {
            totalPages, isLoading, loadPage, isVisible
        } = this.props;

        if (!isLoading && totalPages === 0) return this.renderNoProducts();

        return (
            <div block="CategoryProductList" mods={ { isLoading } }>
                { this.renderLoadButton() }
                { this.renderPages() }
                <div block="CategoryProductList" elem="Page">
                    <CategoryProductListPlaceholder
                      isLoading={ isLoading }
                      isVisible={ isVisible() }
                      updatePages={ loadPage }
                    />
                </div>
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
    selectedFilters: FilterType.isRequired,
    getPageFromUrl: PropTypes.func.isRequired,
    loadPrevPage: PropTypes.func.isRequired,
    isShowLoading: PropTypes.func.isRequired,
    isVisible: PropTypes.func.isRequired
};

export default CategoryProductList;
