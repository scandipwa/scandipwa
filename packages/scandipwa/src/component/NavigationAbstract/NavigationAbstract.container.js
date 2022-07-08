/* eslint-disable react/require-render-return */

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
import { NavigationStateHistoryType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import { isScrollDisabled, toggleScroll } from 'Util/Browser';
import history from 'Util/History';
import { isHomePageUrl } from 'Util/Url';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.config';

export const DEFAULT_STATE = { name: DEFAULT_STATE_NAME };

/** @namespace Component/NavigationAbstract/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/NavigationAbstract/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/NavigationAbstract/Container */
export class NavigationAbstractContainer extends PureComponent {
    static propTypes = {
        setNavigationState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        navigationState: NavigationStateHistoryType.isRequired,
        device: DeviceType.isRequired
    };

    default_state = DEFAULT_STATE;

    routeMap = {
        '/': this.default_state
    };

    state = {
        prevPathname: ''
    };

    componentDidMount() {
        const { setNavigationState } = this.props;
        setNavigationState(this.getNavigationState());
        history.listen((history) => {
            this.handlePageScroll();
            this.setState(this.onRouteChanged(history));
        });
    }

    onRouteChanged(history) {
        const { device } = this.props;

        // check if token is expired and logout
        isSignedIn();

        if (!device.isMobile) {
            return this.handleDesktopRouteChange(history);
        }

        return this.handleMobileUrlChange(history);
    }

    getNavigationState() {
        const { pathname } = location;

        const activeRoute = Object.keys(this.routeMap).find((route) => (
            (route !== '/' && route !== '') || isHomePageUrl(pathname)) && pathname.includes(route));

        return this.routeMap[activeRoute] || this.default_state;
    }

    goToDefaultHeaderState() {
        const { setNavigationState } = this.props;
        const state = this.getNavigationState();

        setNavigationState(state);
    }

    handleMobileUrlChange(history) {
        const { prevPathname } = this.state;
        const { pathname } = history;

        if (prevPathname === pathname) {
            return {};
        }

        return this.handleMobileRouteChange(history);
    }

    handleMobileRouteChange(history) {
        const {
            // hideActiveOverlay,
            setNavigationState,
            navigationState: { name }
        } = this.props;

        const { pathname } = history;

        // Find the new state name
        const newNavigationState = this.getNavigationState();

        // Update the state if new name is set
        if (name !== newNavigationState.name) {
            setNavigationState(newNavigationState);
        }

        // hideActiveOverlay();

        return { prevPathname: pathname };
    }

    handleDesktopRouteChange() {
        const {
            hideActiveOverlay,
            setNavigationState
        } = this.props;

        setNavigationState(this.routeMap['/']);
        hideActiveOverlay();

        return {};
    }

    handlePageScroll() {
        if (isScrollDisabled()) {
            toggleScroll(true);
        }
    }

    render() {
        throw new Error('Please re-define a "render" method.');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationAbstractContainer);
