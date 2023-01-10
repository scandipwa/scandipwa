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
import { Dispatch } from 'redux';

import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import CmsPage from 'Route/CmsPage';
import { CmsPageContainerProps } from 'Route/CmsPage/CmsPage.type';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';

import {
    HomePageContainerMapDispatchProps,
    HomePageContainerMapStateProps,
    HomePageContainerProps,
    HomePageContainerPropsKeys,
} from './HomePage.type';

import './HomePage.style';

/** @namespace Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = (): HomePageContainerMapStateProps => ({});

/** @namespace Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): HomePageContainerMapDispatchProps => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
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
        } = this.props;

        return {
            changeHeaderState,
            currentUrl,
            match,
            pageIdentifiers: window.actionName?.identifier || 'homepage',
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
