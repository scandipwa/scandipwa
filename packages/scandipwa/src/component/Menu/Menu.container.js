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

import { DeviceType } from 'Type/Device.type';
import history from 'Util/History';

import Menu from './Menu.component';

/** @namespace Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    compareTotals: state.ProductCompareReducer.count,
    menu: state.MenuReducer.menu
});

/** @namespace Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export const itemShape = {
    icon: PropTypes.any,
    is_active: PropTypes.bool,
    item_class: PropTypes.string,
    item_id: PropTypes.any,
    parent_id: PropTypes.any,
    position: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
        // eslint-disable-next-line react/forbid-prop-types
        state: PropTypes.any
    })
};
// Items are recursive
itemShape.children = PropTypes.objectOf(PropTypes.shape(itemShape));

export const itemShapeType = PropTypes.shape(itemShape);

/** @namespace Component/Menu/Container */
export class MenuContainer extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        menu: PropTypes.objectOf(itemShapeType).isRequired,
        compareTotals: PropTypes.number.isRequired
    };

    containerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this)
    };

    __construct(props) {
        super.__construct(props, 'MenuContainer');

        const {
            stack: activeMenuItemsStack = []
        } = history.location.state || {};

        this.state = {
            activeMenuItemsStack
        };
    }

    componentDidMount() {
        const { device: { isMobile } } = this.props;

        if (isMobile) {
            window.addEventListener('popstate', this.historyBackHook);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.historyBackHook);
    }

    containerProps() {
        const {
            device,
            compareTotals
        } = this.props;

        const { activeMenuItemsStack } = this.state;

        const { menu } = this.props;

        return {
            activeMenuItemsStack,
            menu,
            device,
            compareTotals
        };
    }

    historyBackHook() {
        const { activeMenuItemsStack } = this.state;

        if (activeMenuItemsStack.length) {
            this.setState({ activeMenuItemsStack: activeMenuItemsStack.slice(1) });
        }
    }

    _getMenuOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            identifier: header_menu || 'new-main-menu'
        };
    }

    getNewActiveMenuItemsStack(activeMenuItemsStack, item_id) {
        if (activeMenuItemsStack.includes(item_id)) {
            return activeMenuItemsStack.filter((id) => id !== item_id);
        }

        return [item_id, ...activeMenuItemsStack];
    }

    handleSubcategoryClick(e, activeSubcategory) {
        const { activeMenuItemsStack } = this.state;
        const { item_id } = activeSubcategory;

        e.stopPropagation();

        const newActiveMenuItemsStack = this.getNewActiveMenuItemsStack(activeMenuItemsStack, item_id);
        this.setState({ activeMenuItemsStack: newActiveMenuItemsStack });
    }

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
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
