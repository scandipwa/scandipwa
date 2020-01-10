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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isMobile from 'Util/Mobile';
import { history } from 'Route';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.component';

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

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            ...this.onRouteChanged(history.location, true)
        };
    }

    componentDidMount() {
        history.listen(history => this.setState(this.onRouteChanged(history)));
    }

    onRouteChanged(history, isPrevPathnameNotRelevant = false) {
        const { prevPathname } = this.state;
        const { pathname } = history;

        if (!isMobile.any()) {
            return this.handleDesktopRouteChange(history);
        }

        if (!isPrevPathnameNotRelevant && prevPathname === pathname) {
            return {};
        }

        return this.handleMobileRouteChange(history);
    }

    handleMobileRouteChange(history) {
        const {
            hideActiveOverlay,
            setNavigationState,
            navigationState: { name }
        } = this.props;

        const { pathname } = history;

        // Find which route is now active
        const activeRoute = Object.keys(this.routeMap)
            .find(route => pathname.includes(route));

        // Find the new state name
        const newNavigationState = this.routeMap[activeRoute] || this.default_state;

        // Update the state if new name is set
        if (name !== newNavigationState.name) {
            setNavigationState(newNavigationState);
        }

        hideActiveOverlay();

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
