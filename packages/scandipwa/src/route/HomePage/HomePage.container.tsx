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

import { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Footer from 'Component/Footer';
// import InstallPrompt from 'Component/InstallPrompt';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import CmsPage from 'Route/CmsPage';
import { CmsPageContainerProps } from 'Route/CmsPage/CmsPage.type';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { lowPriorityLazy } from 'Util/Request/LowPriorityRender';
import { RootState } from 'Util/Store/Store.type';

import {
    HomePageContainerMapDispatchProps,
    HomePageContainerMapStateProps,
    HomePageContainerProps,
    HomePageContainerPropsKeys,
} from './HomePage.type';

import './HomePage.style';

/** @namespace Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): HomePageContainerMapStateProps => ({
    identifier: state.ConfigReducer.cms_home_page,
});

/** @namespace Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): HomePageContainerMapDispatchProps => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
});

// export const InstallPrompt = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "install-prompt" */ 'Component/InstallPrompt'));

export const InstallPrompt = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "install-prompt" */
    'Component/InstallPrompt'
));

/** @namespace Route/HomePage/Container */
export class HomePageContainer extends PureComponent<HomePageContainerProps> {
    state = {
        isInstallPromptAvailable: window.isInstallPromptAvailable,
    };

    componentDidMount(): void {
        const beforeInstallPromptHandler = (event: Event) => {
            event.preventDefault();
            BrowserDatabase.deleteItem('app_installed');
            window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
        };

        window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
        const {
            changeHeaderState,
        } = this.props;

        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false,
        });
    }

    containerProps(): Pick<CmsPageContainerProps, HomePageContainerPropsKeys> {
        const {
            changeHeaderState,
            currentUrl,
            match,
            identifier,
        } = this.props;

        return {
            changeHeaderState,
            currentUrl,
            match,
            pageIdentifiers: identifier,
        };
    }

    renderInstallPrompt() {
        const { isInstallPromptAvailable } = this.state;

        if (!isInstallPromptAvailable) {
            return null;
        }

        return (
            <Suspense fallback={ (
                <div block="HomePage" elem="InstallPromptFallbackWrapper">
                    <div block="HomePage" elem="InstallPromptFallback" />
                </div>
            ) }
            >
                <InstallPrompt />
            </Suspense>
        );
    }

    render(): ReactElement {
        const { isInstallPromptAvailable } = this.state;

        return (
            <div block="HomePage" mods={ { mobile: !!isInstallPromptAvailable } }>
                { this.renderInstallPrompt() }
                <CmsPage { ...this.containerProps() } />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
