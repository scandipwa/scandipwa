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

import { OrderTab } from 'Component/MyAccountOrder/MyAccountOrder.type';
import MyAccountOrderTab from 'Component/MyAccountOrderTab';
import { ReactElement } from 'Type/Common.type';

import { MyAccountOrderTabsComponentProps } from './MyAccountOrderTabs.type';

import './MyAccountOrderTabs.style';

/** @namespace Component/MyAccountOrderTabs/Component */
export class MyAccountOrderTabsComponent extends PureComponent<MyAccountOrderTabsComponentProps> {
    renderTab(item: OrderTab, i: number): ReactElement {
        const { handleChangeActiveTab, activeTab } = this.props;
        const { title, tabName } = item;

        return (
            <MyAccountOrderTab
              title={ title }
              tabName={ tabName }
              key={ i }
              onTabClick={ handleChangeActiveTab }
              isActive={ tabName === activeTab }
            />
        );
    }

    renderTabs(): ReactElement {
        const { tabs } = this.props;

        return (
            <ul block="MyAccountOrderTabs">
                    { tabs.map(this.renderTab.bind(this)) }
            </ul>
        );
    }

    render(): ReactElement {
        return (
            <div
              block="MyAccountOrderTabs"
              elem="Wrapper"
            >
                { this.renderTabs() }
            </div>
        );
    }
}

export default MyAccountOrderTabsComponent;
