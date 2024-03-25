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

import { MouseEvent } from 'react';
import { connect } from 'react-redux';

import MenuQuery from 'Query/Menu.query';
import { MenuItem } from 'Query/Menu.type';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import MenuHelper from 'Util/Menu';
import { FormattedMenuItem } from 'Util/Menu/Menu.type';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import Menu from './Menu.component';
import { MENU_TRANSITION_DURATION } from './Menu.config';
import {
    MenuComponentProps,
    MenuContainerFunctions,
    MenuContainerMapDispatchProps, MenuContainerMapStateProps, MenuContainerProps, MenuContainerState,
} from './Menu.type';

/** @namespace Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MenuContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    compareTotals: state.ProductCompareReducer.count,
});

/** @namespace Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MenuContainerMapDispatchProps => ({});

/** @namespace Component/Menu/Container */
export class MenuContainer extends DataContainer<MenuContainerProps, MenuContainerState> {
    containerFunctions: MenuContainerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this),
    };

    __construct(props: MenuContainerProps): void {
        super.__construct(props, 'MenuContainer');

        const {
            stack: activeMenuItemsStack = [],
        } = (history.location.state || {}) as { stack: string[] };

        this.state = {
            activeMenuItemsStack,
            collapseMenuItemsStack: [],
            menu: {},
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

    containerProps(): Pick<MenuComponentProps, 'activeMenuItemsStack' | 'menu' | 'device' | 'compareTotals' | 'collapseMenuItemsStack'> {
        const {
            device,
            compareTotals,
        } = this.props;
        const { activeMenuItemsStack, menu, collapseMenuItemsStack } = this.state;

        return {
            activeMenuItemsStack,
            menu,
            device,
            compareTotals,
            collapseMenuItemsStack,
        };
    }

    _getMenu(): void {
        this.fetchData<{ menu: MenuItem[] }>(
            [MenuQuery.getQuery()],
            ({ menu }) => this.setState({
                menu: MenuHelper.reduce(menu),
            }),
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

        this.updateCollapseItem(activeMenuItemsStack, item_id);
        this.setState({ activeMenuItemsStack: [item_id] });
    }

    closeMenu(): void {
        const { device } = this.props;
        const { activeMenuItemsStack } = this.state;

        if (device.isMobile) {
            return;
        }

        this.collapseMenu(activeMenuItemsStack);
        this.setState({ activeMenuItemsStack: [], collapseMenuItemsStack: activeMenuItemsStack });
    }

    collapseMenu(activeMenuItemsStack: string[]): void {
        this.setState({ collapseMenuItemsStack: activeMenuItemsStack });

        setTimeout(() => {
            this.setState({ collapseMenuItemsStack: [] });
        }, MENU_TRANSITION_DURATION);
    }

    updateCollapseItem(activeMenuItemsStack: string[], item_id: string): void {
        const { menu } = this.state;

        const currentMenuChildren = Object.values(menu).map((mainMenu) => mainMenu?.children?.[item_id]?.children);

        if (currentMenuChildren.length > 0 && Object.keys(currentMenuChildren[0]).length === 0) {
            this.collapseMenu(activeMenuItemsStack);
        }
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
