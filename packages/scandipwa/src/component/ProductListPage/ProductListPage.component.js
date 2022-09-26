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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ProductCard from 'Component/ProductCard';
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { FilterType } from 'Type/Category.type';
import { MixType } from 'Type/Common.type';
import { ProductType } from 'Type/ProductList.type';
import { noopFn } from 'Util/Common';

import { DEFAULT_PLACEHOLDER_COUNT } from './ProductListPage.config';

import './ProductListPage.style';

/**
 * Placeholder for List of category product
 * @class ProductListPage
 * @namespace Component/ProductListPage/Component
 */
export class ProductListPage extends PureComponent {
    static propTypes = {
        isInfiniteLoaderEnabled: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isVisible: PropTypes.bool.isRequired,
        updatePages: PropTypes.func.isRequired,
        numberOfPlaceholders: PropTypes.number,
        selectedFilters: FilterType,
        wrapperRef: PropTypes.func,
        pageNumber: PropTypes.number,
        items: PropTypes.arrayOf(ProductType),
        mix: MixType,
        isPlp: PropTypes.bool.isRequired
    };

    static defaultProps = {
        numberOfPlaceholders: DEFAULT_PLACEHOLDER_COUNT,
        wrapperRef: noopFn,
        selectedFilters: {},
        pageNumber: null,
        items: [],
        mix: {}
    };

    state = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    componentDidMount() {
        this.startObserving();
    }

    componentDidUpdate() {
        this.startObserving();
    }

    componentWillUnmount() {
        this.stopObserving();
    }

    containerProps() {
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.state;

        const { isPlp } = this.props;

        return {
            productCardFunctions: {
                setSiblingsHaveBrands: () => this.setState({ siblingsHaveBrands: true }),
                setSiblingsHavePriceBadge: () => this.setState({ siblingsHavePriceBadge: true }),
                setSiblingsHaveTierPrice: () => this.setState({ siblingsHaveTierPrice: true }),
                setSiblingsHaveConfigurableOptions: () => this.setState({ siblingsHaveConfigurableOptions: true })
            },
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions
            },
            isPlp
        };
    }

    startObserving() {
        const {
            items,
            updatePages,
            isInfiniteLoaderEnabled
        } = this.props;

        if (!isInfiniteLoaderEnabled || items.length) {
            return;
        }

        if (this.node && !this.observer && 'IntersectionObserver' in window) {
            const options = {
                rootMargin: '0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver(([{ intersectionRatio }]) => {
                const { items, isLoading } = this.props;

                // must not be a product items list, and must not be loading
                if (intersectionRatio > 0 && !items.length && !isLoading) {
                    this.stopObserving();
                    updatePages();
                }
            }, options);

            this.observer.observe(this.node);
        }
    }

    stopObserving() {
        if (this.observer) {
            if (this.observer.unobserve && this.node) {
                this.observer.unobserve(this.node);
            }

            if (this.observer.disconnect) {
                this.observer.disconnect();
            }

            this.observer = null;
        }
    }

    renderPlaceholders() {
        const {
            numberOfPlaceholders, mix: {
                mods: {
                    layout = GRID_LAYOUT
                } = {}
            }
        } = this.props;

        return Array.from(
            { length: numberOfPlaceholders },
            (_, i) => (
                <ProductCard
                  key={ i }
                  product={ {} }
                  layout={ layout }
                />
            )
        );
    }

    getPlaceholderRef() {
        const { isVisible } = this.props;

        if (!isVisible) {
            return undefined;
        }

        return (node) => {
            this.node = node;
        };
    }

    renderPageItems() {
        const {
            items,
            selectedFilters,
            mix: {
                mods: {
                    layout = GRID_LAYOUT
                } = {}
            }
        } = this.props;

        return items.map((product, i) => (
            <ProductCard
              product={ product }
              // eslint-disable-next-line react/no-array-index-key
              key={ i }
              selectedFilters={ selectedFilters }
              layout={ layout }
              { ...this.containerProps() }
            />
        ));
    }

    renderPlaceholderItems() {
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

    renderItems() {
        const { items, isLoading } = this.props;

        if (!items.length || isLoading) {
            return this.renderPlaceholderItems();
        }

        return this.renderPageItems();
    }

    render() {
        const {
            pageNumber,
            wrapperRef,
            mix
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

export default ProductListPage;
