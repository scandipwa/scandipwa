/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import Pagination from 'Component/Pagination';
import ProductListPage from 'Component/ProductListPage';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { noopFn } from 'Util/Common';
import { IndexedProduct } from 'Util/Product/Product.type';

import { OBSERVER_THRESHOLD } from './ProductList.config';
import { PageProps, ProductListComponentProps } from './ProductList.type';

import './ProductList.style';

/**
 * List of category products
 * @class ProductList
 * @namespace Component/ProductList/Component
 */
export class ProductList extends PureComponent<ProductListComponentProps> {
    static defaultProps: Partial<ProductListComponentProps> = {
        mix: {},
        title: '',
        isInfiniteLoaderEnabled: false,
        isPaginationEnabled: false,
        selectedFilters: {},
        isLoading: false,
        updatePage: noopFn,
        totalPages: 1,
        loadPage: noopFn,
        loadPrevPage: noopFn,
        currentPage: 1,
        isShowLoading: false,
        isVisible: true,
        isWidget: false
    };

    observer: IntersectionObserver | null = null;

    nodes: Record<string, HTMLElement | null> = {};

    observedNodes: HTMLElement[] = [];

    pagesIntersecting: number[] = [];

    componentDidUpdate(prevProps: ProductListComponentProps): void {
        const { isWidget, currentPage, device } = this.props;
        const { currentPage: prevCurrentPage } = prevProps;

        // Scroll up on page change, ignore widgets
        if (prevCurrentPage !== currentPage && !isWidget && !device.isMobile) {
            scrollToTop({ behavior: 'smooth' });
        }

        const { isInfiniteLoaderEnabled } = this.props;

        if (isInfiniteLoaderEnabled) {
            this.observePageChange();
        }
    }

    componentWillUnmount(): void {
        if (this.observer && this.observer.disconnect) {
            this.observer.disconnect();
        }

        this.observer = null;
    }

    observePageChange(): void {
        const { updatePage, isLoading } = this.props;

        if (isLoading) {
            this.pagesIntersecting = [];
        }

        if (!this.observer && 'IntersectionObserver' in window) {
            const threshold = this._getThreshold();

            this.observer = new IntersectionObserver((entries) => {
                const { currentPage } = this.props;

                entries.forEach(({ target, isIntersecting }) => {
                    const page = +(Object.keys(this.nodes).find((node) => this.nodes[ node ] === target) || 0);
                    const index = this.pagesIntersecting.indexOf(page);

                    if (isIntersecting && index === -1) {
                        this.pagesIntersecting.push(page);
                    }

                    if (!isIntersecting && index > -1) {
                        this.pagesIntersecting.splice(index, 1);
                    }
                });

                const minPage = Math.min(...this.pagesIntersecting);

                if (minPage < Infinity && minPage !== currentPage) {
                    updatePage(minPage);
                }
            }, {
                rootMargin: '0px',
                threshold
            });
        }

        this.updateObserver();
    }

    updateObserver(): void {
        const currentNodes = Object.values(this.nodes);

        if (!this.observer || currentNodes.length <= 0) {
            return;
        }

        currentNodes.forEach((node) => {
            if (node && !this.observedNodes.includes(node)) {
                this.observer?.observe(node);
                this.observedNodes.push(node);
            }
        });

        this.observedNodes = this.observedNodes.reduce((acc: HTMLElement[], node) => {
            if (!currentNodes.includes(node)) {
                this.observer?.unobserve(node);
            } else {
                acc.push(node);
            }

            return acc;
        }, []);
    }

    _getThreshold(): number[] {
        const hundredPercent = 100;

        return Array.from(
            { length: (hundredPercent / OBSERVER_THRESHOLD) + 1 },
            (_, i) => i * (OBSERVER_THRESHOLD / hundredPercent)
        );
    }

    renderLoadButton(): ReactElement {
        const {
            isShowLoading,
            isInfiniteLoaderEnabled,
            loadPrevPage
        } = this.props;

        if (!isShowLoading || !isInfiniteLoaderEnabled) {
            return null;
        }

        return (
            <div
              block="ProductList"
              elem="LoadButton"
              role="button"
              tabIndex={ 0 }
              onKeyUp={ loadPrevPage }
              onClick={ loadPrevPage }
            >
                { __('Load previous') }
            </div>
        );
    }

    renderNoProducts(): ReactElement {
        return (
            <div block="ProductList">
                <div
                  block="ProductList"
                  elem="ProductsMissing"
                >
                    <h2>{ __('We are sorry!') }</h2>
                    <h3>{ __('There were no products found matching your request.') }</h3>
                    <p>{ __('Please, try removing selected filters and try again!') }</p>
                </div>
            </div>
        );
    }

    renderPages(): ReactElement {
        const {
            pages,
            isVisible,
            isLoading,
            isInfiniteLoaderEnabled
        } = this.props;

        if (isLoading) {
            return this.renderPage();
        }

        const pageRenders = Object.entries(pages).map(this.renderProductPage.bind(this));

        if (isVisible && isInfiniteLoaderEnabled) { // add placeholders to the end of pages if needed
            const key = Math.max(...(Object.keys(pages) as unknown as number[])) + 1; // the key should match next page key

            pageRenders.push(this.renderPage({ key }));
        }

        return pageRenders;
    }

    _processProps(props: Partial<PageProps>): Partial<PageProps> {
        const { isInfiniteLoaderEnabled } = this.props;

        if (isInfiniteLoaderEnabled) {
            return props;
        }

        // there must be no more then one page per screen
        // if the "isInfiniteLoaderEnabled" is false
        const { key, ...restProps } = props;

        restProps.key = 0;

        return { ...restProps, key: 0 };
    }

    renderPage(props: Partial<PageProps> = {}): ReactElement {
        const {
            isInfiniteLoaderEnabled,
            loadPage,
            isLoading,
            isVisible,
            mix,
            isPlp
        } = this.props;
        const {
            items = [],
            // keys = [],
            pageNumber = 0,
            selectedFilters = {},
            wrapperRef,
            key
        } = this._processProps(props);

        return (
            <ProductListPage
              key={ key }
              isInfiniteLoaderEnabled={ isInfiniteLoaderEnabled }
              updatePages={ loadPage }
              isLoading={ isLoading }
              isVisible={ isVisible }
              mix={ mix }
              items={ items }
            //   keys={ keys }
              pageNumber={ pageNumber }
              selectedFilters={ selectedFilters }
              wrapperRef={ wrapperRef }
              isPlp={ isPlp }
            />
        );
    }

    renderProductPage([k, items = []]: [k: string, items: IndexedProduct[]]): ReactElement {
        const { selectedFilters } = this.props;
        const key = Number(k);

        const pageNumber = key;

        return this.renderPage({
            selectedFilters,
            pageNumber,
            items,
            key,
            wrapperRef: (node: HTMLElement | null) => {
                this.nodes[ pageNumber ] = node;
            }
        });
    }

    renderPagination(): ReactElement {
        const {
            isLoading,
            totalPages,
            isPaginationEnabled
        } = this.props;

        if (!isPaginationEnabled) {
            return null;
        }

        return (
            <Pagination
              isLoading={ isLoading }
              totalPages={ totalPages }
            />
        );
    }

    renderTitle(): ReactElement {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return (
            <h2>{ title }</h2>
        );
    }

    render(): ReactElement {
        const {
            totalPages,
            isLoading,
            mix
        } = this.props;

        if (!isLoading && totalPages === 0) {
            return this.renderNoProducts();
        }

        return (
            <div
              block="ProductList"
              mods={ { isLoading } }
              mix={ mix }
            >
                { this.renderTitle() }
                { this.renderLoadButton() }
                { this.renderPages() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default ProductList;
