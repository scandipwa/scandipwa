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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import MyAccountOrderTab from 'Component/MyAccountOrderTab';

import './MyAccountOrderTabs.style';

/** @namespace Component/MyAccountOrderTabs/Component */
export class MyAccountOrderTabs extends PureComponent {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            tabName: PropTypes.string.isRequired,
            render: PropTypes.func.isRequired,
            title: PropTypes.string.isRequired
        })).isRequired,
        handleChangeActiveTab: PropTypes.func.isRequired,
        activeTab: PropTypes.string.isRequired
    };

    renderActiveTab() {
        const { tabs, activeTab } = this.props;

        return tabs[activeTab].render();
    }

    renderTab(item, i) {
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

    renderTabs() {
        const { tabs } = this.props;

        return (
            <ul block="MyAccountOrderTabs">
                    { tabs.map(this.renderTab.bind(this)) }
            </ul>
        );
    }

    render() {
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

export default MyAccountOrderTabs;
