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
import { connect } from 'react-redux';

import { MENU_SUBCATEGORY } from 'Component/Header/Header.config';
import MenuQuery from 'Query/Menu.query';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import MenuHelper from 'Util/Menu';
import isMobile from 'Util/Mobile';
import DataContainer from 'Util/Request/DataContainer';

import Menu from './Menu.component';

export const mapDispatchToProps = (dispatch) => ({
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export class MenuContainer extends DataContainer {
    static propTypes = {
        goToPreviousHeaderState: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    state = {
        activeMenuItemsStack: [],
        menu: {}
    };

    containerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this)
    };

    componentDidMount() {
        this._getMenu();
    }

    _getMenuOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            identifier: [header_menu || 'new-main-menu']
        };
    }

    _getMenu() {
        this.fetchData(
            [MenuQuery.getQuery(this._getMenuOptions())],
            ({ menu }) => this.setState({
                menu: MenuHelper.reduce(menu)
            })
        );
    }

    handleSubcategoryClick(e, activeSubcategory) {
        const { activeMenuItemsStack } = this.state;
        const { changeHeaderState, goToPreviousHeaderState } = this.props;
        const { item_id, title } = activeSubcategory;

        e.stopPropagation();

        changeHeaderState({
            name: MENU_SUBCATEGORY,
            force: true,
            title,
            onBackClick: () => {
                this.setState(({ activeMenuItemsStack }) => (
                    { activeMenuItemsStack: activeMenuItemsStack.slice(1) }
                ));
                goToPreviousHeaderState();
            }
        });

        if (!activeMenuItemsStack.includes(item_id)) {
            this.setState({ activeMenuItemsStack: [item_id, ...activeMenuItemsStack] });
        }
    }

    onCategoryHover(activeSubcategory) {
        if (isMobile.any()) {
            return;
        }

        const { activeMenuItemsStack } = this.state;
        const { item_id } = activeSubcategory;

        if (!activeMenuItemsStack.includes(item_id)) {
            this.setState({ activeMenuItemsStack: [item_id] });
        }
    }

    closeMenu() {
        if (isMobile.any()) {
            return;
        }

        this.setState({ activeMenuItemsStack: [] });
    }

    render() {
        return (
            <Menu
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MenuContainer);
