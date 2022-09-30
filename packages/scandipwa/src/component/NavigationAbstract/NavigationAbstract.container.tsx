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

import { Location } from 'history';
import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';

import { NavigationState } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { isScrollDisabled, toggleScroll } from 'Util/Browser';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { isHomePageUrl } from 'Util/Url';

import { DEFAULT_STATE_NAME } from './NavigationAbstract.config';
import {
    NavigationAbstractContainerMapDispatchProps,
    NavigationAbstractContainerMapStateProps,
    NavigationAbstractContainerProps,
    NavigationAbstractContainerState,
} from './NavigationAbstract.type';

export const DEFAULT_STATE = { name: DEFAULT_STATE_NAME };

/** @namespace Component/NavigationAbstract/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NavigationAbstractContainerMapStateProps => ({
    device: state.ConfigReducer.device,
});

/** @namespace Component/NavigationAbstract/Container/mapDispatchToProps */
export const mapDispatchToProps = (): NavigationAbstractContainerMapDispatchProps => ({});

/** @namespace Component/NavigationAbstract/Container */
export class NavigationAbstractContainer<
Props extends NavigationAbstractContainerProps,
State extends NavigationAbstractContainerState,
> extends PureComponent<Props, State> {
    default_state = DEFAULT_STATE;

    routeMap: Record<string, NavigationState> = {
        '/': this.default_state,
    };

    state: State = {
        prevPathname: '',
    } as unknown as State;

    componentDidMount(): void {
        const { setNavigationState } = this.props;

        setNavigationState(this.getNavigationState());
        history.listen((history) => {
            this.handlePageScroll();
            this.setState(this.onRouteChanged(history));
        });
    }

    onRouteChanged(history: Location): { prevPathname?: string } {
        const { device } = this.props;

        // check if token is expired and logout
        isSignedIn();

        if (!device.isMobile) {
            return this.handleDesktopRouteChange();
        }

        return this.handleMobileUrlChange(history);
    }

    getNavigationState(): { name: string } {
        const { pathname } = location;

        const activeRoute = Object.keys(this.routeMap).find((route) => (
            (route !== '/' && route !== '') || isHomePageUrl(pathname)) && pathname.includes(route));

        if (activeRoute && this.routeMap[ activeRoute ]) {
            return this.routeMap[ activeRoute ];
        }

        return this.default_state;
    }

    goToDefaultHeaderState(): void {
        const { setNavigationState } = this.props;
        const state = this.getNavigationState();

        setNavigationState(state);
    }

    handleMobileUrlChange(history: Location): { prevPathname?: string } {
        const { prevPathname } = this.state;
        const { pathname } = history;

        if (prevPathname === pathname) {
            return {};
        }

        return this.handleMobileRouteChange(history);
    }

    handleMobileRouteChange(history: Location): { prevPathname?: string } {
        const {
            // hideActiveOverlay,
            setNavigationState,
            navigationState: { name },
        } = this.props;

        const { pathname } = history;

        // Find the new state name
        const newNavigationState = this.getNavigationState();

        // Update the state if new name is set
        if (name !== newNavigationState.name) {
            setNavigationState(newNavigationState);
        }

        return { prevPathname: pathname };
    }

    handleDesktopRouteChange(): { prevPathname?: string } {
        const {
            hideActiveOverlay,
            setNavigationState,
        } = this.props;

        setNavigationState(this.routeMap[ '/' ]);
        hideActiveOverlay();

        return {};
    }

    handlePageScroll(): void {
        if (isScrollDisabled()) {
            toggleScroll(true);
        }
    }

    render(): ReactElement {
        throw new Error('Please re-define a "render" method.');

        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    NavigationAbstractContainer as unknown as ComponentType<never>,
);
