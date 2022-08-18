/* eslint-disable react/prop-types */
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

import {
    ComponentType, lazy, PureComponent, Suspense
} from 'react';

import RenderWhenVisible from 'Component/RenderWhenVisible';
import { ReactElement } from 'Type/Common.type';

import {
    Widget
} from './WidgetFactory.config';
import { WidgetComponentProps, WidgetFactoryComponentProps, WidgetFactoryComponentRenderMap } from './WidgetFactory.type';

import './WidgetFactory.style';

export const ProductListWidget = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "widget-product-list" */
    'Component/ProductListWidget'
));
export const NewProducts = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "widget-new-product" */
    'Component/NewProducts'
));
export const HomeSlider = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "widget-slider" */
    'Component/SliderWidget'
));
export const RecentlyViewedWidget = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "widget-recently-viewed" */
    'Component/RecentlyViewedWidget'
));

/** @namespace Component/WidgetFactory/Component */
export class WidgetFactory extends PureComponent<WidgetFactoryComponentProps> {
    renderMap: WidgetFactoryComponentRenderMap = {
        [Widget.SLIDER]: {
            component: HomeSlider,
            fallback: this.renderSliderFallback
        },
        [Widget.NEW_PRODUCTS]: {
            component: NewProducts
        },
        [Widget.CATALOG_PRODUCT_LIST]: {
            component: ProductListWidget
        },
        [Widget.RECENTLY_VIEWED]: {
            component: RecentlyViewedWidget as unknown as ComponentType<WidgetComponentProps>
        }
    };

    renderSliderFallback(): JSX.Element {
        return (
            <div block="WidgetFactory" elem="SliderPlaceholder" />
        );
    }

    renderDefaultFallback(): JSX.Element {
        return <div />;
    }

    renderContent(): ReactElement {
        const {
            type,
            sliderId = 0,
            displayType,
            productsCount,
            showPager,
            storeId,
            title,
            conditionsEncoded
        } = this.props;
        const {
            component: Widget,
            fallback
        } = this.renderMap[type] || {};

        if (Widget !== undefined) {
            return (
                <RenderWhenVisible fallback={ fallback }>
                    <Widget
                      sliderId={ sliderId }
                      displayType={ displayType }
                      productsCount={ productsCount }
                      showPager={ !!showPager }
                      storeId={ storeId }
                      title={ title }
                      conditionsEncoded={ conditionsEncoded }
                    />
                </RenderWhenVisible>
            );
        }

        return null;
    }

    renderFallback(): Exclude<ReactElement, undefined> | null {
        const { type } = this.props;
        const { fallback = this.renderDefaultFallback } = this.renderMap[type] || {};

        return fallback();
    }

    render(): ReactElement {
        return (
            <Suspense fallback={ this.renderFallback() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}

export default WidgetFactory;
