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

import PropTypes from 'prop-types';
import { lazy, PureComponent, Suspense } from 'react';

import { CATALOG_PRODUCT_LIST, NEW_PRODUCTS, SLIDER } from './WidgetFactory.config';

const ProductListWidget = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true, webpackChunkName: "category" */ 'Component/ProductListWidget'));
const NewProducts = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true, webpackChunkName: "category" */ 'Component/NewProducts'));
const HomeSlider = lazy(() => import(/* webpackMode: "lazy", webpackPrefetch: true, webpackChunkName: "slider" */ 'Component/SliderWidget'));

export default class WidgetFactory extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired
    };

    renderMap = {
        [SLIDER]: {
            component: HomeSlider
        },
        [NEW_PRODUCTS]: {
            component: NewProducts
        },
        [CATALOG_PRODUCT_LIST]: {
            component: ProductListWidget
        }
    };

    renderContent() {
        const { type } = this.props;
        const { component: Widget } = this.renderMap[type] || {};

        if (Widget !== undefined) {
            return <Widget { ...this.props } />;
        }

        return null;
    }

    renderFallback() {
        return <div />;
    }

    render() {
        return (
            <Suspense fallback={ this.renderFallback() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}
