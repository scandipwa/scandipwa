/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
<<<<<<< HEAD:packages/scandipwa/src/route/HomePage/HomePage.container.tsx
 * @package scandipwa/scandipwa
=======
 * @package scandipwa/scandipwa
>>>>>>> scandipwa/master:packages/scandipwa/src/route/HomePage/HomePage.container.js
 * @link https://github.com/scandipwa/scandipwa
 */

import { Location } from 'history';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import CmsPage from 'Route/CmsPage';
import { CmsPageContainerProps } from 'Route/CmsPage/CmsPage.type';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
<<<<<<< HEAD:packages/scandipwa/src/route/HomePage/HomePage.container.tsx
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { HistoryState } from 'Util/History/History.type';
import { RootState } from 'Util/Store/Store.type';

import {
    HomePageContainerMapDispatchProps,
    HomePageContainerMapStateProps,
    HomePageContainerProps,
    HomePageContainerPropsKeys
} from './HomePage.type';
=======
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { MatchType } from 'Type/Router.type';
>>>>>>> scandipwa/master:packages/scandipwa/src/route/HomePage/HomePage.container.js

import './HomePage.style';

/** @namespace Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): HomePageContainerMapStateProps => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page
});

/** @namespace Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): HomePageContainerMapDispatchProps => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state))
});

/** @namespace Route/HomePage/Container */
<<<<<<< HEAD:packages/scandipwa/src/route/HomePage/HomePage.container.tsx
export class HomePageContainer extends PureComponent<HomePageContainerProps> {
    componentDidMount(): void {
=======
export class HomePageContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        pageIdentifiers: PropTypes.string.isRequired,
        currentUrl: PropTypes.string.isRequired,
        match: MatchType.isRequired
    };

    componentDidMount() {
>>>>>>> scandipwa/master:packages/scandipwa/src/route/HomePage/HomePage.container.js
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }

    containerProps(): Pick<CmsPageContainerProps, HomePageContainerPropsKeys> {
        const {
            changeHeaderState,
            currentUrl,
            match,
            pageIdentifiers
        } = this.props;

        return {
            changeHeaderState,
<<<<<<< HEAD:packages/scandipwa/src/route/HomePage/HomePage.container.tsx
            location: location as Location<HistoryState>,
=======
            currentUrl,
>>>>>>> scandipwa/master:packages/scandipwa/src/route/HomePage/HomePage.container.js
            match,
            pageIdentifiers
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
