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

import ExpandableContent from 'Component/ExpandableContent';
import MyAccountTabListItem from 'Component/MyAccountTabListItem';
import { MyAccountTab } from 'Route/MyAccount/MyAccount.type';
import { ObjectEntries, ReactElement } from 'Type/Common.type';

import { MyAccountTabListComponentProps } from './MyAccountTabList.type';

import './MyAccountTabList.style';

/** @namespace Component/MyAccountTabList/Component */
export class MyAccountTabListComponent<
P extends Readonly<MyAccountTabListComponentProps> = Readonly<MyAccountTabListComponentProps>,
S extends MyAccountTabListComponentState = MyAccountTabListComponentState,
> extends PureComponent<P, S> {
    renderTabListItem(
        tabEntry: ObjectEntries<Record<string, MyAccountTab>>,
        index: number,
        tabArray: ObjectEntries<Record<string, MyAccountTab>>[],
    ): ReactElement {
        const { activeTab, onTabClick } = this.props;
        const [key, tab] = tabEntry;
        const { section } = tab;
        const nextTab = tabArray[index + 1] || [];
        const { section: nextTabSection = section } = nextTab[1] || {};

        return (
            <MyAccountTabListItem
              key={ key }
              isActive={ activeTab === key }
              changeActiveTab={ onTabClick }
              tabEntry={ tabEntry }
            >
                { nextTabSection !== section ? this.renderLine() : null }
            </MyAccountTabListItem>
        );
    }

    renderLine(): ReactElement {
        return (
            <div block="MyAccountTabList" elem="Separator" />
        );
    }

    renderLogoutTab(): ReactElement {
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

    render(): ReactElement {
        const {
            activeTab,
            isContentExpanded,
            tabMap,
            toggleExpandableContent,
        } = this.props;
        const { tabName } = tabMap[activeTab];

        const tabs = [
            ...Object.entries(tabMap).map(this.renderTabListItem.bind(this)),
            this.renderLogoutTab(),
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

export default MyAccountTabListComponent;
