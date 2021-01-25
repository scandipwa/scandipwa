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
import { DeviceType } from 'Type/Device';
import history from 'Util/History';
import MenuHelper from 'Util/Menu';
import DataContainer from 'Util/Request/DataContainer';

import Menu from './Menu.component';

/** @namespace Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Component/Menu/Container */
export class MenuContainer extends DataContainer {
    static propTypes = {
        goToPreviousHeaderState: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        device: DeviceType.isRequired
    };

    containerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const {
            stack: activeMenuItemsStack = []
        } = history.location.state || {};

        this.state = {
            activeMenuItemsStack,
            menu: {}
        };
    }

    populateHeaderStateFromStack = () => {
        const { changeHeaderState } = this.props;
        const { activeMenuItemsStack, menu } = this.state;
        const [mainMenu] = Object.values(menu);

        activeMenuItemsStack.slice().reduceRight((acc, itemId) => {
            const {
                children: {
                    [itemId]: currentItem
                }
            } = acc;

            const { title } = currentItem;

            changeHeaderState({
                name: MENU_SUBCATEGORY,
                force: true,
                title,
                onBackClick: this.handleHeaderBackClick
            });

            return currentItem;
        }, mainMenu);
    };

    componentDidMount() {
        const { device: { isMobile } } = this.props;

        this._getMenu();

        if (isMobile) {
            window.addEventListener('popstate', this.historyBackHook);
        }
    }

    historyBackHook = () => {
        const { activeMenuItemsStack } = this.state;

        if (activeMenuItemsStack.length) {
            this.setState({ activeMenuItemsStack: activeMenuItemsStack.slice(1) });

            const { goToPreviousHeaderState } = this.props;
            goToPreviousHeaderState();
        }
    };

    componentWillUnmount() {
        window.removeEventListener('popstate', this.historyBackHook);
    }

    _getMenuOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            identifier: header_menu || 'new-main-menu'
        };
    }

    _getMenu() {
        this.fetchData(
            [MenuQuery.getQuery(this._getMenuOptions())],
            ({ menu }) => this.setState({
                menu: MenuHelper.reduce(menu)
            }, this.populateHeaderStateFromStack)
        );
    }

    handleSubcategoryClick(e, activeSubcategory) {
        const { changeHeaderState } = this.props;
        const { activeMenuItemsStack } = this.state;
        const { item_id, title } = activeSubcategory;

        e.stopPropagation();

        if (activeMenuItemsStack.includes(item_id)) {
            return;
        }

        changeHeaderState({
            name: MENU_SUBCATEGORY,
            force: true,
            title,
            onBackClick: this.handleHeaderBackClick
        });

        const newActiveMenuItemsStack = [item_id, ...activeMenuItemsStack];
        this.setState({ activeMenuItemsStack: newActiveMenuItemsStack });

        // keep the stack here, so later we can de-construct menu out of it
        const { pathanme } = location;
        history.push(pathanme, { stack: newActiveMenuItemsStack });
    }

    handleHeaderBackClick = () => {
        history.goBack();
    };

    onCategoryHover(activeSubcategory) {
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

    closeMenu() {
        const { device } = this.props;
        if (device.isMobile) {
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
