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

import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';

import MyAccountTabList from './MyAccountTabList.component';
import {
    MyAccountTabListComponentProps,
    MyAccountTabListContainerDispatchProps,
    MyAccountTabListContainerFunctions,
    MyAccountTabListContainerMapStateProps,
    MyAccountTabListContainerProps,
    MyAccountTabListContainerState,
} from './MyAccountTabList.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountTabList/Container/mapStateToProps */
export const mapStateToProps = (): MyAccountTabListContainerMapStateProps => ({});

/** @namespace Component/MyAccountTabList/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountTabListContainerDispatchProps => ({
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, true),
    ),
});

/** @namespace Component/MyAccountTabList/Container */
export class MyAccountTabListContainer extends PureComponent<
MyAccountTabListContainerProps,
MyAccountTabListContainerState
> {
    static defaultProps: Partial<MyAccountTabListContainerProps> = {
        onSignOut: noopFn,
    };

    state: MyAccountTabListContainerState = {
        isContentExpanded: false,
    };

    containerFunctions: MyAccountTabListContainerFunctions = {
        handleLogout: this.handleLogout.bind(this),
        onTabClick: this.onTabClick.bind(this),
        toggleExpandableContent: this.toggleExpandableContent.bind(this),
    };

    containerProps(): Pick<MyAccountTabListComponentProps, 'tabMap' | 'activeTab' | 'isContentExpanded'> {
        const {
            tabMap,
            activeTab,
        } = this.props;
        const { isContentExpanded } = this.state;

        return {
            tabMap,
            activeTab,
            isContentExpanded,
        };
    }

    handleLogout(): void {
        const { onSignOut, logout } = this.props;

        logout();
        onSignOut();
    }

    onTabClick(key: string): void {
        const { changeActiveTab } = this.props;

        if (!isSignedIn()) {
            return;
        }

        this.toggleExpandableContent();
        changeActiveTab(key);
    }

    toggleExpandableContent(): void {
        this.setState(({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded }));
    }

    render(): ReactElement {
        return (
            <MyAccountTabList
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTabListContainer);
