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

import ContentWrapper from 'Component/ContentWrapper';
import ProductTab from 'Component/ProductTab';
import { ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import { isMobile } from 'Util/Mobile';

import { ProductTabsComponentProps, ProductTabShape } from './ProductTabs.type';

import './ProductTabs.style';

/** @namespace Component/ProductTabs/Component */
export class ProductTabsComponent extends PureComponent<ProductTabsComponentProps> {
    renderActiveTab(): ReactElement {
        const {
            tabs,
            activeTab,
        } = this.props;

        const { render, name } = tabs.find(({ id }) => id === activeTab) || {};

        if (!render || !name) {
            return null;
        }

        return render(name);
    }

    renderAllTabs(): ReactElement {
        const { tabs } = this.props;

        return tabs.map(({ render, name }) => render(name));
    }

    renderTab(item: ProductTabShape): ReactElement {
        const { activeTab, handleTabSelect } = this.props;
        const { id } = item;

        return (
            <ProductTab
              tab={ item }
              key={ id }
              onClick={ handleTabSelect }
              isActive={ id === activeTab }
            />
        );
    }

    renderTabs(): ReactElement {
        const { tabs } = this.props;

        if (!tabs?.length) {
            return null;
        }

        if (isMobile.any() || isSSR() || isCrawler()) {
            return this.renderAllTabs();
        }

        return (
            <>
                <ul block="ProductTabs">
                    { tabs.sort(
                        (prevTab, nextTab) => prevTab.position - nextTab.position,
                    ).map(this.renderTab.bind(this)) }
                </ul>
                { this.renderActiveTab() }
            </>
        );
    }

    render(): ReactElement {
        return (
            <ContentWrapper
              wrapperMix={ { block: 'ProductTabs', elem: 'Wrapper' } }
              label={ __('Product tabs') }
            >
                { this.renderTabs() }
            </ContentWrapper>
        );
    }
}

export default ProductTabsComponent;
