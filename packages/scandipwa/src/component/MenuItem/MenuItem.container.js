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

import history from 'Util/History';

import MenuItem from './MenuItem.component';
import { HOVER_TIMEOUT } from './MenuItem.config';

/** @namespace Component/MenuItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/MenuItem/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MenuItem/Container */
export class MenuItemContainer extends PureComponent {
    static propTypes = {
        closeMenu: PropTypes.func,
        onCategoryHover: PropTypes.func,
        item: PropTypes.object.isRequired,
        activeMenuItemsStack: PropTypes.array.isRequired,
        isExpandable: PropTypes.bool,
        itemMods: PropTypes.object,
        isLink: PropTypes.bool
    };

    static defaultProps = {
        closeMenu: () => {},
        onCategoryHover: () => {},
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
        const { closeMenu, activeMenuItemsStack } = this.props;
        window.scrollTo({ top: 0 });
        closeMenu();

        // keep the stack here, so later we can deconstruct menu out of it
        const { pathname } = location;
        history.push(pathname, { stack: activeMenuItemsStack });
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
