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

import { DeviceType } from 'Type/Device';

import HamburgerMenu from './HamburgerMenu.component';

export const SideMenuDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../../store/SideMenu/SideMenu.dispatcher'
);

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    isSideMenuOpen: state.SideMenuReducer.isSideMenuOpen
});

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    closeSideMenu: () => SideMenuDispatcher.then(
        ({ default: dispatcher }) => dispatcher.closeSideMenu(dispatch)
    )
});

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Container/HamburgerMenuContainer */
export class HamburgerMenuContainer extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        closeSideMenu: PropTypes.func.isRequired,
        isSideMenuOpen: PropTypes.bool.isRequired
    };

    containerFunctions = {
        // getData: this.getData.bind(this)
    };

    containerProps = () => {
        const {
            device,
            closeSideMenu,
            isSideMenuOpen
        } = this.props;

        return {
            device,
            closeSideMenu,
            isSideMenuOpen
        };
    };

    render() {
        return (
            <HamburgerMenu
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenuContainer);
