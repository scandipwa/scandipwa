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

import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { MenuLocation } from 'Util/Menu/Menu.type';
import { RootState } from 'Util/Store/Store.type';

import MenuItem from './MenuItem.component';
import { HOVER_TIMEOUT } from './MenuItem.config';
import {
    MenuItemComponentProps,
    MenuItemContainerFunctions,
    MenuItemContainerProps,
    MenuItemMapDispatchProps,
    MenuItemMapStateProps,
} from './MenuItem.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Component/MenuItem/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MenuItemMapStateProps => ({
    device: state.ConfigReducer.device,
});

/** @namespace Component/MenuItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MenuItemMapDispatchProps => ({
    updateBreadcrumbs: () => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update([], dispatch),
    ),
});

/** @namespace Component/MenuItem/Container */
export class MenuItemContainer<
P extends Readonly<MenuItemContainerProps> = Readonly<MenuItemContainerProps>,
S extends MenuItemContainerState = MenuItemContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MenuItemContainerProps> = {
        closeMenu: noopFn,
        onCategoryHover: noopFn,
        itemMods: {},
        isLink: false,
        isExpandable: false,
    };

    containerFunctions: MenuItemContainerFunctions = {
        handleCategoryHover: this.handleCategoryHover.bind(this),
        handleLinkLeave: this.handleLinkLeave.bind(this),
        onItemClick: this.onItemClick.bind(this),
    };

    menuHoverTimeout?: NodeJS.Timeout;

    containerProps(): Pick<
    MenuItemComponentProps,
    'activeMenuItemsStack' | 'isExpandable' | 'isLink' | 'item' | 'itemMods'
    > {
        const {
            activeMenuItemsStack,
            isExpandable,
            isLink,
            item,
            itemMods,
        } = this.props;

        return {
            activeMenuItemsStack,
            isExpandable,
            isLink,
            item,
            itemMods,
        };
    }

    getPathname(url: MenuLocation | string): string {
        if (typeof url === 'string') {
            return url;
        }

        const { pathname } = url;

        return pathname;
    }

    onItemClick(): void {
        const {
            closeMenu,
            updateBreadcrumbs,
            activeMenuItemsStack,
            item: {
                url,
            } = {},
        } = this.props;

        const newPathname = this.getPathname(url || '');

        scrollToTop();
        closeMenu();

        // keep the stack here, so later we can deconstruct menu out of it
        const { pathname } = location;

        history.push(pathname, { stack: activeMenuItemsStack });

        if (pathname !== newPathname) {
            updateBreadcrumbs();
        }
    }

    handleCategoryHover(): void {
        const { onCategoryHover, item, activeMenuItemsStack } = this.props;

        const hoverTimeOut = activeMenuItemsStack.length === 0 ? HOVER_TIMEOUT : 0;

        this.menuHoverTimeout = setTimeout(() => {
            onCategoryHover(item);
        }, hoverTimeOut);
    }

    handleLinkLeave(): void {
        if (this.menuHoverTimeout) {
            clearTimeout(this.menuHoverTimeout);
        }
    }

    render(): ReactElement {
        return (
            <MenuItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
