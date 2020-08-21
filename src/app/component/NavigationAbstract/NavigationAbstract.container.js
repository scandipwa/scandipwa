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

import history from 'Util/History';
import isMobile from 'Util/Mobile';
import { appendWithStoreCode } from 'Util/Url';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.config';

export const DEFAULT_STATE = { name: DEFAULT_STATE_NAME };

export class NavigationAbstractContainer extends PureComponent {
    static propTypes = {
        setNavigationState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        navigationState: PropTypes.object.isRequired
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
        history.listen((history) => this.setState(this.onRouteChanged(history)));
    }

    onRouteChanged(history) {
        if (!isMobile.any() && !isMobile.tablet()) {
            return this.handleDesktopRouteChange(history);
        }

        return this.handleMobileUrlChange(history);
    }

    getNavigationState() {
        const { pathname } = location;

        const activeRoute = Object.keys(this.routeMap)
            .find((route) => (
                route !== '/'
                || pathname === appendWithStoreCode('/')
                || pathname === '/'
            ) && pathname.includes(route));

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

    render() {
        throw new Error('Please re-define a "render" method.');
    }
}

export default NavigationAbstractContainer;
