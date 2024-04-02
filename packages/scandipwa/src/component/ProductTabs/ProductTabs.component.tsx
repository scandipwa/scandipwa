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

import { createRef, PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import ProductTab from 'Component/ProductTab';
import { ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import CSS from 'Util/CSS';
import { isMobile } from 'Util/Mobile';

import { ProductTabsComponentProps, ProductTabsComponentState, ProductTabShape } from './ProductTabs.type';

import './ProductTabs.style';

/** @namespace Component/ProductTabs/Component */
export class ProductTabsComponent extends PureComponent<ProductTabsComponentProps, ProductTabsComponentState> {
    state = {
        activeTab: '',
        isFadeIn: false,
    };

    activeTabContentRef = createRef<HTMLDivElement>();

    tabContentRef = createRef<HTMLDivElement>();

    private observer: ResizeObserver | null = null;

    __construct(props: ProductTabsComponentProps): void {
        super.__construct?.(props);

        this.onTabClick = this.onTabClick.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount(): void {
        this.updateDefaultSelectedTab();
        this.observer = new ResizeObserver(this.handleResize);

        if (this.activeTabContentRef.current) {
            this.observer.observe(this.activeTabContentRef.current);
        }
    }

    componentDidUpdate(prevProps: ProductTabsComponentProps): void {
        const { tabs: prevTabs } = prevProps;
        const { tabs } = this.props;
        const [prevTab] = prevTabs;
        const [tab] = tabs;

        if (tab?.id !== prevTab?.id) {
            this.updateDefaultSelectedTab();
        }
    }

    handleResize(entries: ResizeObserverEntry[]): void {
        const [currentTabContent] = entries;

        if (this.tabContentRef.current) {
            CSS.setVariable(this.tabContentRef, 'tab-content-height', `${currentTabContent.contentRect.height}px`);
        }

        if (this.activeTabContentRef.current) {
            this.setState({ isFadeIn: true });
        }
    }

    updateDefaultSelectedTab(): void {
        const { tabs } = this.props;

        if (!tabs?.length) {
            return;
        }

        const [{ id }] = tabs;

        this.setActiveTab(id);
    }

    onTabClick(tab: string): void {
        const { tabs } = this.props;
        const { activeTab } = this.state;

        const { id: currentTab = '' } = tabs.find(({ name }) => name === tab) || {};

        if (activeTab !== currentTab) {
            this.setActiveTab(currentTab);

            if (this.activeTabContentRef.current) {
                this.setState({ isFadeIn: false });
            }
        }
    }

    setActiveTab(activeTab: string): void {
        this.setState({ activeTab });
    }

    renderActiveTab(): ReactElement {
        const { tabs } = this.props;
        const { activeTab } = this.state;
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
        const { activeTab } = this.state;
        const { id, name } = item;

        return (
            <ProductTab
              tabName={ name }
              key={ id }
              onClick={ this.onTabClick }
              isActive={ id === activeTab }
            />
        );
    }

    renderTabs(): ReactElement {
        const { tabs } = this.props;
        const { isFadeIn } = this.state;

        if (!tabs?.length) {
            return null;
        }

        if (isMobile.any() || isSSR() || isCrawler()) {
            return this.renderAllTabs();
        }

        return (
            <>
                <ul block="ProductTabs">
                    { tabs.map(this.renderTab.bind(this)) }
                </ul>
                <div block="ProductTabsContent" mods={ { isFadeIn } } ref={ this.tabContentRef }>
                    <div block="ProductTabsContent" elem="ActiveTab" ref={ this.activeTabContentRef }>
                        { this.renderActiveTab() }
                    </div>
                </div>
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
