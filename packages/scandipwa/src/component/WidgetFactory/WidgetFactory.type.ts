/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ComponentType } from 'react';

import { Widget } from './WidgetFactory.config';

export interface WidgetFactoryComponentProps {
    type: Widget;
    sliderId: number;
    displayType: string;
    productsCount: number;
    showPager: boolean;
    storeId: string;
    title: string;
    conditionsEncoded: string;
}

export interface WidgetComponentProps {
    sliderId: number;
    displayType: string;
    productsCount: number;
    showPager: boolean;
    storeId: string;
    title: string;
    conditionsEncoded: string;
}

export interface WidgetFactoryComponentRenderMapItem {
    component: ComponentType<WidgetComponentProps>;
    fallback?: () => JSX.Element;
}

export interface WidgetFactoryComponentRenderMap {
    [Widget.SLIDER]: WidgetFactoryComponentRenderMapItem;
    [Widget.NEW_PRODUCTS]: WidgetFactoryComponentRenderMapItem;
    [Widget.CATALOG_PRODUCT_LIST]: WidgetFactoryComponentRenderMapItem;
    [Widget.RECENTLY_VIEWED]: WidgetFactoryComponentRenderMapItem;
}
