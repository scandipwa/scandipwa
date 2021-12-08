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
import { PureComponent } from 'react';

import ExpandableContent from 'Component/ExpandableContent';
import MyAccountTabListItem from 'Component/MyAccountTabListItem';
import { ActiveTabType, TabMapType } from 'Type/Account.type';

import './MyAccountTabList.style';

/** @namespace Component/MyAccountTabList/Component */
export class MyAccountTabList extends PureComponent {
    static propTypes = {
        tabMap: TabMapType.isRequired,
        activeTab: ActiveTabType.isRequired,
        handleLogout: PropTypes.func.isRequired,
        onTabClick: PropTypes.func.isRequired,
        isContentExpanded: PropTypes.bool.isRequired,
        toggleExpandableContent: PropTypes.func.isRequired
    };

    renderTabListItem(tabEntry, index, tabArray) {
        const { activeTab, onTabClick } = this.props;
        const [key, tab] = tabEntry;
        const { section } = tab;
        const nextTab = tabArray[index + 1] || [];
        const { section: nextTabSection = section } = nextTab[1] || {};

        return (
            <>
                <MyAccountTabListItem
                  key={ key }
                  isActive={ activeTab === key }
                  changeActiveTab={ onTabClick }
                  tabEntry={ tabEntry }
                />
                { nextTabSection !== section ? this.renderLine() : null }
            </>
        );
    }

    renderLine() {
        return (
            <div block="MyAccountTabList" elem="Separator" />
        );
    }

    renderLogoutTab() {
        const { handleLogout } = this.props;

        return (
            <li
              key="logout"
              block="MyAccountTabListItem"
            >
                <button
                  block="MyAccountTabListItem"
                  elem="Button"
                  onClick={ handleLogout }
                  role="link"
                >
                    { __('Logout') }
                </button>
            </li>
        );
    }

    render() {
        const {
            activeTab,
            isContentExpanded,
            tabMap,
            toggleExpandableContent
        } = this.props;
        const { tabName } = tabMap[activeTab];

        const tabs = [
            ...Object.entries(tabMap).map(this.renderTabListItem.bind(this)),
            this.renderLogoutTab()
        ];

        return (
            <ExpandableContent
              heading={ tabName }
              isContentExpanded={ isContentExpanded }
              mix={ { block: 'MyAccountTabList' } }
              onClick={ toggleExpandableContent }
              mods={ { isWithoutBorder: true } }
            >
                <ul>
                    { tabs }
                </ul>
            </ExpandableContent>
        );
    }
}

export default MyAccountTabList;
