/* eslint-disable max-len */
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

import './WidgetFactory.style';

import PropTypes from 'prop-types';
import { lazy, PureComponent, Suspense } from 'react';

import RenderWhenVisible from 'Component/RenderWhenVisible';

import { CATALOG_PRODUCT_LIST, NEW_PRODUCTS, SLIDER } from './WidgetFactory.config';

export const ProductListWidget = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Component/ProductListWidget'));
export const NewProducts = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Component/NewProducts'));
export const HomeSlider = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Component/SliderWidget'));

export class WidgetFactory extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired
    };

    renderMap = {
        [SLIDER]: {
            component: HomeSlider,
            fallback: this.renderSliderFallback
        },
        [NEW_PRODUCTS]: {
            component: NewProducts
        },
        [CATALOG_PRODUCT_LIST]: {
            component: ProductListWidget
        }
    };

    renderSliderFallback() {
        return (
            <div block="WidgetFactory" elem="SliderPlaceholder" />
        );
    }

    renderDefaultFallback() {
        return <div />;
    }

    renderContent() {
        const { type } = this.props;
        const {
            component: Widget,
            fallback
        } = this.renderMap[type] || {};

        if (Widget !== undefined) {
            return (
                <RenderWhenVisible fallback={ fallback }>
                    <Widget { ...this.props } />
                </RenderWhenVisible>
            );
        }

        return null;
    }

    renderFallback() {
        const { type } = this.props;
        const { fallback = this.renderDefaultFallback } = this.renderMap[type] || {};
        return fallback();
    }

    render() {
        return (
            <Suspense fallback={ this.renderFallback() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}

export default WidgetFactory;
