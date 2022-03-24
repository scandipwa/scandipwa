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
import { connect } from 'react-redux';

import { ModsType } from 'Type/Common.type';
import { MenuItemType } from 'Type/Menu.type';
import { scrollToTop } from 'Util/Browser';
import { noopFn } from 'Util/Common';
import history from 'Util/History';

import MenuItem from './MenuItem.component';
import { HOVER_TIMEOUT } from './MenuItem.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Component/MenuItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/MenuItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: () => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update([], dispatch)
    )
});

/** @namespace Component/MenuItem/Container */
export class MenuItemContainer extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        closeMenu: PropTypes.func,
        onCategoryHover: PropTypes.func,
        item: MenuItemType.isRequired,
        activeMenuItemsStack: PropTypes.arrayOf(PropTypes.string).isRequired,
        isExpandable: PropTypes.bool,
        itemMods: ModsType,
        isLink: PropTypes.bool
    };

    static defaultProps = {
        closeMenu: noopFn,
        onCategoryHover: noopFn,
        itemMods: {},
        isLink: false,
        isExpandable: false
    };

    containerFunctions = {
        handleCategoryHover: this.handleCategoryHover.bind(this),
        handleLinkLeave: this.handleLinkLeave.bind(this),
        onItemClick: this.onItemClick.bind(this)
    };

    menuHoverTimeout = null;

    containerProps() {
        const {
            activeMenuItemsStack,
            isExpandable,
            isLink,
            item,
            itemMods
        } = this.props;

        return {
            activeMenuItemsStack,
            isExpandable,
            isLink,
            item,
            itemMods
        };
    }

    onItemClick() {
        const {
            closeMenu,
            updateBreadcrumbs,
            activeMenuItemsStack,
            item: { url: { pathname: newPathname = '' } = {} } = {}
        } = this.props;

        scrollToTop();
        closeMenu();

        // keep the stack here, so later we can deconstruct menu out of it
        const { pathname } = location;
        history.push(pathname, { stack: activeMenuItemsStack });

        if (pathname !== newPathname) {
            updateBreadcrumbs();
        }
    }

    handleCategoryHover() {
        const { onCategoryHover, item, activeMenuItemsStack } = this.props;

        const hoverTimeOut = activeMenuItemsStack.length === 0 ? HOVER_TIMEOUT : 0;

        this.menuHoverTimeout = setTimeout(() => {
            onCategoryHover(item);
        }, hoverTimeOut);
    }

    handleLinkLeave() {
        clearTimeout(this.menuHoverTimeout);
    }

    render() {
        return (
            <MenuItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
