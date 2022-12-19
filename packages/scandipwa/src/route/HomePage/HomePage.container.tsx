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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import CmsPage from 'Route/CmsPage';
import { CmsPageContainerProps } from 'Route/CmsPage/CmsPage.type';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import {
    HomePageContainerMapDispatchProps,
    HomePageContainerMapStateProps,
    HomePageContainerProps,
    HomePageContainerPropsKeys,
} from './HomePage.type';

import './HomePage.style';

export const NavigationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Navigation/Navigation.dispatcher'
);

/** @namespace Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): HomePageContainerMapStateProps => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page,
});

/** @namespace Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (): HomePageContainerMapDispatchProps => ({
    changeHeaderState: (state) => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state),
    ),
});

/** @namespace Route/HomePage/Container */
export class HomePageContainer extends PureComponent<HomePageContainerProps> {
    componentDidMount(): void {
        const { changeHeaderState } = this.props;

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
            pageIdentifiers,
        } = this.props;

        return {
            changeHeaderState,
            currentUrl,
            match,
            pageIdentifiers,
        };
    }

    render(): ReactElement {
        return (
            <div block="HomePage">
                <InstallPrompt />
                <CmsPage { ...this.containerProps() } />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
