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

import ProductCard from 'Component/ProductCard';
import { ProductCardContainerProps } from 'Component/ProductCard/ProductCard.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { PRODUCTS_PRELOAD_COUNT } from 'Util/Product';
import { setLoadedFlag } from 'Util/Request/LowPriorityLoad';
import { AfterPriority } from 'Util/Request/LowPriorityRender';

import { DEFAULT_PLACEHOLDER_COUNT } from './ProductListPage.config';
import { ProductListPageComponentProps, ProductListPageComponentState } from './ProductListPage.type';

import './ProductListPage.style';

/**
 * Placeholder for List of category product
 * @class ProductListPage
* @namespace Component/ProductListPage/Component
 */
export class ProductListPageComponent extends PureComponent<
ProductListPageComponentProps,
ProductListPageComponentState
> {
    static defaultProps: Partial<ProductListPageComponentProps> = {
        numberOfPlaceholders: DEFAULT_PLACEHOLDER_COUNT,
        wrapperRef: noopFn,
        selectedFilters: {},
        pageNumber: undefined,
        items: [],
        mix: {},
    };

    observer?: IntersectionObserver;

    node?: Element;

    componentDidMount(): void {
        this.startObserving();
    }

    componentDidUpdate(): void {
        this.startObserving();
    }

    componentWillUnmount(): void {
        this.stopObserving();
    }

    containerProps(): Pick<ProductCardContainerProps, 'isPlp'> {
        const { isPlp } = this.props;

        return {
            isPlp,
        };
    }

    startObserving(): void {
        const {
            items,
            updatePages,
            isInfiniteLoaderEnabled,
        } = this.props;

        if (!isInfiniteLoaderEnabled || items.length) {
            return;
        }

        if (this.node && !this.observer && 'IntersectionObserver' in window) {
            const options = {
                rootMargin: '0px',
                threshold: 0.1,
            };

            this.observer = new IntersectionObserver(([{ intersectionRatio }]) => {
                const { items, isLoading } = this.props;

                // must not be a product items list, and must not be loading
                if (intersectionRatio > 0 && !items.length && !isLoading) {
                    // disable isPrefetchValueUsed value to let next pages to be requested on direct links (on preloads)
                    window.isPrefetchValueUsed = false;
                    this.stopObserving();
                    updatePages();
                }
            }, options);

            this.observer.observe(this.node);
        }
    }

    stopObserving(): void {
        if (this.observer) {
            if (this.observer.unobserve && this.node) {
                this.observer.unobserve(this.node);
            }

            if (this.observer.disconnect) {
                this.observer.disconnect();
            }

            this.observer = undefined;
        }
    }

    renderPlaceholders(): ReactElement {
        const {
            numberOfPlaceholders = DEFAULT_PLACEHOLDER_COUNT,
            mix: {
                mods: {
                    layout = CategoryPageLayout.GRID,
                } = {},
            },
        } = this.props;

        return Array.from(
            { length: numberOfPlaceholders },
            (_, i) => {
                if (i < PRODUCTS_PRELOAD_COUNT) {
                    return (
                        <ProductCard
                          key={ i }
                          product={ {} }
                          layout={ layout as CategoryPageLayout }
                          onLoad={ setLoadedFlag }
                        />
                    );
                }

                return (
                    // @ts-ignore
                    <AfterPriority fallback={ <div style={ { minHeight: 200 } } /> }>
                        <ProductCard
                          key={ i }
                          product={ {} }
                          layout={ layout as CategoryPageLayout }
                          onLoad={ setLoadedFlag }
                        />
                    </AfterPriority>
                );
            },
        );
    }

    getPlaceholderRef(): ((node: Element | null) => void) | undefined {
        const { isVisible } = this.props;

        if (!isVisible) {
            return undefined;
        }

        return (node) => {
            this.node = node || undefined;
        };
    }

    renderPageItems(): ReactElement {
        const {
            items,
            selectedFilters,
            mix: {
                mods: {
                    layout = CategoryPageLayout.GRID,
                } = {},
            },
        } = this.props;

        return items.map((product, i) => {
            if (i < PRODUCTS_PRELOAD_COUNT) {
                return (
                    <ProductCard
                      product={ product }
                    // eslint-disable-next-line react/no-array-index-key
                      key={ i }
                      selectedFilters={ selectedFilters }
                      layout={ layout as CategoryPageLayout }
                      { ...this.containerProps() }
                      onLoad={ setLoadedFlag }
                    />
                );
            }

            return (
                // @ts-ignore
                <AfterPriority fallback={ <div style={ { minHeight: 200 } } /> }>
                    <ProductCard
                      product={ product }
                    // eslint-disable-next-line react/no-array-index-key
                      key={ i }
                      selectedFilters={ selectedFilters }
                      layout={ layout as CategoryPageLayout }
                      { ...this.containerProps() }
                      onLoad={ setLoadedFlag }
                    />
                </AfterPriority>
            );
        });
    }

    renderPlaceholderItems(): ReactElement {
        return (
            <>
                <li
                  block="ProductListPage"
                  elem="Offset"
                  ref={ this.getPlaceholderRef() }
                />
                { this.renderPlaceholders() }
            </>
        );
    }

    renderItems(): ReactElement {
        const { items, isLoading } = this.props;

        if (!items.length || isLoading) {
            return this.renderPlaceholderItems();
        }

        return this.renderPageItems();
    }

    render(): ReactElement {
        const {
            pageNumber,
            wrapperRef,
            mix,
        } = this.props;

        return (
            <ul
              block="ProductListPage"
              mix={ { ...mix, elem: 'Page' } }
              key={ pageNumber }
              ref={ wrapperRef }
            >
                { this.renderItems() }
            </ul>
        );
    }
}

export default ProductListPageComponent;
