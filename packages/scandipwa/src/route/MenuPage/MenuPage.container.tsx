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

import { Page } from 'Component/Header/Header.config';
import Menu from 'Component/Menu';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { history } from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import {
    MenuPageContainerMapDispatchProps,
    MenuPageContainerMapStateProps,
    MenuPageContainerProps,
    MenuPageContainerState,
} from './MenuPage.type';

/** @namespace Route/MenuPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MenuPageContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Route/MenuPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MenuPageContainerMapDispatchProps => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
});

/** @namespace Route/MenuPage/Container */
export class MenuPageContainer<
P extends Readonly<MenuPageContainerProps> = Readonly<MenuPageContainerProps>,
S extends MenuPageContainerState = MenuPageContainerState,
> extends PureComponent<P, S> {
    __construct(): void {
        this.redirectIfNotOnMobile();
    }

    componentDidMount(): void {
        const { updateMeta, changeHeaderState } = this.props;

        updateMeta({ title: __('Menu') });
        changeHeaderState({
            name: Page.MENU,
            onBackClick: () => history.goBack(),
        });
    }

    componentDidUpdate(): void {
        this.redirectIfNotOnMobile();
    }

    redirectIfNotOnMobile(): void {
        const { isMobile } = this.props;

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
