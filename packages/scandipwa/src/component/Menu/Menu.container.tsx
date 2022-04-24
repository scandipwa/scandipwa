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

import { MouseEvent } from 'react';
import { connect } from 'react-redux';

import MenuQuery from 'Query/Menu.query';
import { Menu as MenuData } from 'Query/Menu.type';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import MenuHelper from 'Util/Menu';
import { FormattedMenuItem } from 'Util/Menu/Menu.type';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import Menu from './Menu.component';
import {
    MenuComponentProps,
    MenuContainerMapDispatchProps, MenuContainerMapStateProps, MenuContainerProps, MenuContainerState
} from './Menu.type';

/** @namespace Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MenuContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    compareTotals: state.ProductCompareReducer.count
});

/** @namespace Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MenuContainerMapDispatchProps => ({});

/** @namespace Component/Menu/Container */
export class MenuContainer extends DataContainer<MenuContainerProps, MenuContainerState> {
    containerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this)
    };

    __construct(props: MenuContainerProps): void {
        super.__construct(props, 'MenuContainer');

        const {
            stack: activeMenuItemsStack = []
        } = (history.location.state || {}) as { stack: string[] };

        this.state = {
            activeMenuItemsStack,
            menu: {}
        };
    }

    componentDidMount(): void {
        const { device: { isMobile } } = this.props;

        this._getMenu();

        if (isMobile) {
            window.addEventListener('popstate', this.historyBackHook);
        }
    }

    historyBackHook(): void {
        const { activeMenuItemsStack } = this.state;

        if (activeMenuItemsStack.length) {
            this.setState({ activeMenuItemsStack: activeMenuItemsStack.slice(1) });
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('popstate', this.historyBackHook);
    }

    containerProps(): Pick<MenuComponentProps, 'activeMenuItemsStack' | 'menu' | 'device' | 'compareTotals'> {
        const {
            device,
            compareTotals
        } = this.props;
        const { activeMenuItemsStack, menu } = this.state;

        return {
            activeMenuItemsStack,
            menu,
            device,
            compareTotals
        };
    }

    _getMenuOptions(): { identifier: string } {
        const {
            header_content: {
                header_menu = ''
            } = {}
        } = window.contentConfiguration || {};

        return {
            identifier: header_menu || 'new-main-menu'
        };
    }

    _getMenu(): void {
        this.fetchData<{ menu: MenuData }>(
            [MenuQuery.getQuery(this._getMenuOptions())],
            ({ menu }) => this.setState({
                menu: MenuHelper.reduce(menu)
            })
        );
    }

    getNewActiveMenuItemsStack(activeMenuItemsStack: string[], item_id: string): string[] {
        if (activeMenuItemsStack.includes(item_id)) {
            return activeMenuItemsStack.filter((id) => id !== item_id);
        }

        return [item_id, ...activeMenuItemsStack];
    }

    handleSubcategoryClick(e: MouseEvent, activeSubcategory: FormattedMenuItem): void {
        const { activeMenuItemsStack } = this.state;
        const { item_id } = activeSubcategory;

        e.stopPropagation();

        const newActiveMenuItemsStack = this.getNewActiveMenuItemsStack(activeMenuItemsStack, item_id);
        this.setState({ activeMenuItemsStack: newActiveMenuItemsStack });
    }

    onCategoryHover(activeSubcategory: FormattedMenuItem): void {
        const { device } = this.props;
        const { activeMenuItemsStack } = this.state;

        if (device.isMobile) {
            return;
        }

        const { item_id } = activeSubcategory;

        if (activeMenuItemsStack.includes(item_id)) {
            return;
        }

        this.setState({ activeMenuItemsStack: [item_id] });
    }

    closeMenu(): void {
        const { device } = this.props;

        if (device.isMobile) {
            return;
        }

        this.setState({ activeMenuItemsStack: [] });
    }

    render(): ReactElement {
        return (
            <Menu
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
