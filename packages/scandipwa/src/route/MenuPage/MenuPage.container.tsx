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
<<<<<<< HEAD:packages/scandipwa/src/route/MenuPage/MenuPage.container.tsx
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
=======
>>>>>>> scandipwa/master:packages/scandipwa/src/route/MenuPage/MenuPage.container.js

import { Page } from 'Component/Header/Header.config';
import Menu from 'Component/Menu';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
<<<<<<< HEAD:packages/scandipwa/src/route/MenuPage/MenuPage.container.tsx
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import {
    MenuPageContainerMapDispatchProps,
    MenuPageContainerMapStateProps,
    MenuPageContainerProps
} from './MenuPage.type';
=======
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
>>>>>>> scandipwa/master:packages/scandipwa/src/route/MenuPage/MenuPage.container.js

/** @namespace Route/MenuPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MenuPageContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Route/MenuPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MenuPageContainerMapDispatchProps => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state))
});

/** @namespace Route/MenuPage/Container */
<<<<<<< HEAD:packages/scandipwa/src/route/MenuPage/MenuPage.container.tsx
export class MenuPageContainer extends PureComponent<MenuPageContainerProps> {
    __construct(): void {
=======
export class MenuPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    __construct() {
>>>>>>> scandipwa/master:packages/scandipwa/src/route/MenuPage/MenuPage.container.js
        this.redirectIfNotOnMobile();
    }

    componentDidMount(): void {
        const { updateMeta, changeHeaderState } = this.props;

        updateMeta({ title: __('Menu') });
        changeHeaderState({
            name: Page.MENU,
            onBackClick: () => history.back()
        });
    }

    componentDidUpdate(): void {
        this.redirectIfNotOnMobile();
    }

<<<<<<< HEAD:packages/scandipwa/src/route/MenuPage/MenuPage.container.tsx
    redirectIfNotOnMobile(): void {
        const { history, isMobile } = this.props;
=======
    redirectIfNotOnMobile() {
        const { isMobile } = this.props;
>>>>>>> scandipwa/master:packages/scandipwa/src/route/MenuPage/MenuPage.container.js

        if (!isMobile) {
            history.push('/');
        }
    }

    render(): ReactElement {
        return (
            <main block="MenuPage">
                <Menu />
            </main>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPageContainer);
