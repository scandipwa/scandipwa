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
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HomeSlider from 'Component/SliderWidget';
import NewProducts from 'Component/NewProducts';
import ProductListWidget from 'Component/ProductListWidget';

export const SLIDER = 'Slider';
export const NEW_PRODUCTS = 'NewProducts';
export const CATALOG_PRODUCT_LIST = 'CatalogProductList';

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

    render() {
        const { type } = this.props;
        const { component: Widget } = this.renderMap[type] || {};

        return Widget !== undefined ? <Widget { ...this.props } /> : null;
    }
}
