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
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { updateActiveTab } from 'Store/Product/Product.action';
import { RootState } from 'Util/Store/Store.type';

import ProductTabsComponent from './ProductTabs.component';
import {
    ProductTabsComponentProps,
    ProductTabsContainerFunctions,
    ProductTabsContainerMapDispatchProps,
    ProductTabsContainerMapStateProps,
    ProductTabsContainerProps,
    ProductTabsContainerPropsKeys,
} from './ProductTabs.type';

/** @namespace Component/ProductTabs/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductTabsContainerMapStateProps => ({
    activeTab: state.ProductReducer.activeTab,
});

/** @namespace Component/ProductTabs/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductTabsContainerMapDispatchProps => ({
    setActiveTab: (newActiveTab) => dispatch(updateActiveTab(newActiveTab)),
});

/** @namespace Component/ProductTabs/Container */
export class ProductTabsContainer extends PureComponent<ProductTabsContainerProps> {
    containerFunctions: ProductTabsContainerFunctions = {
        handleTabSelect: this.handleTabSelect.bind(this),
    };

    componentDidMount(): void {
        this.updateDefaultSelectedTab();
    }

    componentDidUpdate(prevProps: ProductTabsContainerProps): void {
        const { tabs: prevTabs } = prevProps;
        const { tabs } = this.props;
        const [{
            id: prevTabId = '',
        } = {}] = prevTabs;

        const [{
            id: tabId = '',
        } = {}] = tabs;

        if (tabId !== prevTabId) {
            this.updateDefaultSelectedTab();
        }
    }

    containerProps(): Pick<ProductTabsComponentProps, ProductTabsContainerPropsKeys> {
        const {
            activeTab,
            tabs,
        } = this.props;

        return {
            activeTab,
            tabs,
        };
    }

    handleTabSelect(newActiveTab: string) : void {
        const { setActiveTab } = this.props;

        setActiveTab(newActiveTab);
    }

    updateDefaultSelectedTab(): void {
        const { tabs } = this.props;

        if (!tabs?.length) {
            return;
        }

        const [{ id }] = tabs;

        this.handleTabSelect(id);
    }

    render() {
        return (
            <ProductTabsComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductTabsContainer);
